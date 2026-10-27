/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Home, Award, CheckCircle2, XCircle, Flame, Coins, Sparkles } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { GameMode } from '../game/mathBattleLogic';
import { soundManager } from '../utils/soundEffects';

interface GameResultScreenProps {
  mode: GameMode;
  score: number;
  correctCount: number;
  incorrectCount: number;
  totalAnswered: number;
  pointsEarned: number;
  coinsEarned: number;
  totalCoins: number;
  totalEarnedPoints: number;
  language: LanguageCode;
  soundEnabled: boolean;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const GameResultScreen: React.FC<GameResultScreenProps> = ({
  mode,
  score,
  correctCount,
  incorrectCount,
  totalAnswered,
  pointsEarned,
  coinsEarned,
  totalCoins,
  totalEarnedPoints,
  language,
  soundEnabled,
  onPlayAgain,
  onGoHome,
}) => {
  const t = TRANSLATIONS[language];
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  useEffect(() => {
    soundManager.playRewardSound(soundEnabled);
    if (correctCount >= 3) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, []);

  const getModeTitle = () => {
    switch (mode) {
      case 'speed_run':
        return t.mode_30s_title;
      case 'endless':
        return t.mode_endless_title;
      default:
        return t.mode_1min_title;
    }
  };

  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-5 flex flex-col justify-between text-white select-none">
      <div>
        {/* Header Badge */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-sky-400 text-xs font-bold border border-blue-500/30">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            {getModeTitle()}
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-2">
            {t.results_title}
          </h2>
        </div>

        {/* Big Score Card */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-4 p-5 rounded-3xl bg-gradient-to-br from-blue-900/40 via-slate-900 to-indigo-950/60 border border-blue-500/30 text-center shadow-xl relative overflow-hidden"
        >
          <Sparkles className="w-5 h-5 text-amber-300 absolute top-3 right-3 animate-spin" />
          <span className="text-xs uppercase font-bold text-slate-400 tracking-widest">
            {t.final_score}
          </span>
          <p className="text-5xl font-black font-mono text-amber-400 mt-1">{score}</p>

          {/* Quick Accuracy Tag */}
          <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-xs font-mono text-slate-300">
            <Flame className="w-3 h-3 text-orange-400" />
            <span>{accuracy}% {t.accuracy}</span>
          </div>
        </motion.div>

        {/* Round Rewards Banner */}
        <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-500/15 border border-amber-500/30 flex items-center justify-around text-center">
          <div>
            <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
              {t.coins_earned}
            </p>
            <p className="text-xl font-black font-mono text-amber-400">+{coinsEarned}</p>
          </div>
          <div className="w-px h-8 bg-amber-500/30" />
          <div>
            <p className="text-[11px] font-bold text-sky-300 uppercase tracking-wide">
              {t.points_earned}
            </p>
            <p className="text-xl font-black font-mono text-sky-400">+{pointsEarned}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-slate-400">{t.correct_answers}</p>
              <p className="text-sm font-bold text-slate-100 font-mono">{correctCount}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
            <XCircle className="w-4 h-4 text-red-400" />
            <div>
              <p className="text-slate-400">{t.incorrect_answers}</p>
              <p className="text-sm font-bold text-slate-100 font-mono">{incorrectCount}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
            <Coins className="w-4 h-4 text-amber-400" />
            <div>
              <p className="text-slate-400">Total Coins</p>
              <p className="text-sm font-bold text-amber-300 font-mono">{totalCoins.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
            <Award className="w-4 h-4 text-sky-400" />
            <div>
              <p className="text-slate-400">Total Points</p>
              <p className="text-sm font-bold text-sky-300 font-mono">{totalEarnedPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 space-y-2.5">
        <button
          onClick={() => {
            soundManager.playButtonClick(soundEnabled);
            onPlayAgain();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 active:scale-95 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t.play_again}</span>
        </button>

        <button
          onClick={() => {
            soundManager.playButtonClick(soundEnabled);
            onGoHome();
          }}
          className="w-full py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition"
        >
          <Home className="w-4 h-4" />
          <span>{t.back_to_home}</span>
        </button>
      </div>
    </div>
  );
};
