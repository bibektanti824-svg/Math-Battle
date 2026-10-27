/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Timer, XCircle, CheckCircle2, AlertTriangle, LogOut } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { GameMode, MathQuestion, generateQuestion, GAME_REWARDS } from '../game/mathBattleLogic';
import { soundManager } from '../utils/soundEffects';

interface GamePlayScreenProps {
  mode: GameMode;
  durationSeconds: number;
  language: LanguageCode;
  soundEnabled: boolean;
  onFinishRound: (results: {
    mode: GameMode;
    score: number;
    correctCount: number;
    incorrectCount: number;
    totalAnswered: number;
    pointsEarned: number;
    coinsEarned: number;
  }) => void;
  onQuitEarly: () => void;
}

export const GamePlayScreen: React.FC<GamePlayScreenProps> = ({
  mode,
  durationSeconds,
  language,
  soundEnabled,
  onFinishRound,
  onQuitEarly,
}) => {
  const t = TRANSLATIONS[language];

  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [earnedCoins, setEarnedCoins] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState<MathQuestion>(() => generateQuestion());
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const timerRef = useRef<any>(null);
  const isFinishedRef = useRef(false);

  // Timer countdown (pauses safely when exit dialog is open)
  useEffect(() => {
    if (mode === 'endless' || showExitConfirm) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleRoundComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, showExitConfirm]);

  const handleRoundComplete = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);

    onFinishRound({
      mode,
      score,
      correctCount,
      incorrectCount,
      totalAnswered: questionsAnswered,
      pointsEarned: earnedPoints,
      coinsEarned: earnedCoins,
    });
  };

  const handleOptionTap = (choice: number) => {
    if (isAnswerLocked || isFinishedRef.current) return;

    setIsAnswerLocked(true);
    setSelectedOption(choice);

    const isCorrect = choice === currentQuestion.correctAnswer;
    const nextTotalAnswered = questionsAnswered + 1;
    setQuestionsAnswered(nextTotalAnswered);

    if (isCorrect) {
      setScore((s) => s + GAME_REWARDS.CORRECT_SCORE);
      setEarnedPoints((p) => p + GAME_REWARDS.CORRECT_POINTS);
      setEarnedCoins((c) => c + GAME_REWARDS.CORRECT_COINS);
      setCorrectCount((c) => c + 1);
      setFeedbackState('correct');
      soundManager.playCorrectSound(soundEnabled);
    } else {
      setIncorrectCount((i) => i + 1);
      setFeedbackState('wrong');
      soundManager.playWrongSound(soundEnabled);
    }

    // Feedback delay (450ms) then advance to next question
    setTimeout(() => {
      if (isFinishedRef.current) return;

      setSelectedOption(null);
      setFeedbackState('idle');
      setCurrentQuestion((prev) => generateQuestion(prev.displayText));
      setIsAnswerLocked(false);
    }, 450);
  };

  return (
    <div className="relative w-full h-full px-4 py-4 flex flex-col justify-between text-white select-none overflow-hidden">
      {/* Top HUD */}
      <div>
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md shadow-md">
          {/* Timer Display */}
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg ${
                mode === 'endless'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : timeLeft <= 10
                  ? 'bg-red-500/20 text-red-400 animate-pulse'
                  : 'bg-blue-500/20 text-blue-400'
              }`}
            >
              <Timer className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {mode === 'endless' ? t.endless_active : t.time_left}
              </p>
              <p
                className={`text-lg font-black font-mono leading-none ${
                  mode === 'endless'
                    ? 'text-emerald-400'
                    : timeLeft <= 10
                    ? 'text-red-400 animate-pulse'
                    : 'text-white'
                }`}
              >
                {mode === 'endless' ? '∞' : `${timeLeft}${t.seconds_abbr}`}
              </p>
            </div>
          </div>

          {/* Questions Counter */}
          <div className="text-center">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {t.total_answered}
            </p>
            <p className="text-lg font-black font-mono text-slate-200 leading-none">
              {questionsAnswered}
            </p>
          </div>

          {/* Current Score */}
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              {t.score}
            </p>
            <p className="text-xl font-black font-mono text-amber-400 leading-none">
              {score}
            </p>
          </div>
        </div>

        {/* Live Reward Pill */}
        <div className="mt-2 flex items-center justify-center gap-3 text-[11px] font-mono">
          <span className="text-amber-300">🪙 +{earnedCoins} Coins</span>
          <span className="text-slate-500">•</span>
          <span className="text-sky-300">⭐ +{earnedPoints} Pts</span>
        </div>
      </div>

      {/* Main Question Display Card */}
      <div className="my-auto py-4">
        <motion.div
          key={currentQuestion.id}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{
            scale: feedbackState === 'wrong' ? [1, 1.03, 0.97, 1] : 1,
            opacity: 1,
            borderColor:
              feedbackState === 'correct'
                ? '#22c55e'
                : feedbackState === 'wrong'
                ? '#ef4444'
                : 'rgba(51, 65, 85, 0.8)',
          }}
          transition={{ duration: 0.25 }}
          className={`w-full py-8 px-4 rounded-3xl bg-slate-900/90 border-2 shadow-2xl flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden transition-colors ${
            feedbackState === 'correct'
              ? 'border-emerald-500 shadow-emerald-500/20'
              : feedbackState === 'wrong'
              ? 'border-red-500 shadow-red-500/20'
              : 'border-slate-700/80'
          }`}
        >
          {/* Subtle Feedback Banner */}
          <AnimatePresence>
            {feedbackState === 'correct' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 flex items-center gap-1 text-emerald-400 text-xs font-bold"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t.correct_alert}</span>
              </motion.div>
            )}
            {feedbackState === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute top-2 flex items-center gap-1 text-red-400 text-xs font-bold"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{t.wrong_alert}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">
            Calculate
          </span>
          <h2 className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
            {currentQuestion.displayText}
          </h2>
        </motion.div>
      </div>

      {/* Answer Options Grid (4 buttons, 2x2) */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion.options.map((choice, idx) => {
            const isSelected = selectedOption === choice;
            const isCorrectAnswer = choice === currentQuestion.correctAnswer;
            const showCorrectHighlight = isAnswerLocked && isCorrectAnswer;
            const showWrongHighlight = isAnswerLocked && isSelected && !isCorrectAnswer;

            return (
              <motion.button
                key={`${currentQuestion.id}_${choice}_${idx}`}
                whileTap={!isAnswerLocked ? { scale: 0.95 } : {}}
                disabled={isAnswerLocked}
                onClick={() => handleOptionTap(choice)}
                className={`h-16 rounded-2xl font-mono text-2xl font-extrabold border-2 shadow-lg transition-all duration-150 flex items-center justify-center ${
                  showCorrectHighlight
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-600/40'
                    : showWrongHighlight
                    ? 'bg-red-600 border-red-400 text-white shadow-red-600/40 animate-shake'
                    : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-white hover:border-slate-500'
                }`}
              >
                {choice}
              </motion.button>
            );
          })}
        </div>

        {/* Exit / Finish Button */}
        <div className="pt-1 flex items-center justify-between">
          <button
            onClick={() => {
              soundManager.playButtonClick(soundEnabled);
              setShowExitConfirm(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white text-xs font-semibold transition active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{mode === 'endless' ? t.finish_round : t.exit}</span>
          </button>

          {mode === 'endless' && (
            <button
              onClick={() => {
                soundManager.playButtonClick(soundEnabled);
                handleRoundComplete();
              }}
              className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition active:scale-95"
            >
              {t.finish_round}
            </button>
          )}
        </div>
      </div>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xs rounded-2xl bg-slate-900 border border-slate-700 p-5 text-center shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">{t.quit_confirm_title}</h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">{t.quit_confirm_desc}</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundManager.playButtonClick(soundEnabled);
                  setShowExitConfirm(false);
                }}
                className="flex-1 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-700 transition"
              >
                {t.resume}
              </button>
              <button
                onClick={() => {
                  soundManager.playButtonClick(soundEnabled);
                  setShowExitConfirm(false);
                  handleRoundComplete();
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 text-xs font-bold text-white hover:bg-red-500 transition"
              >
                {t.finish_round}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
