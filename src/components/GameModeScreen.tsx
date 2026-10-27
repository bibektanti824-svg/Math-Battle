/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Timer, Zap, Infinity as InfinityIcon, Play } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { GameMode } from '../game/mathBattleLogic';
import { soundManager } from '../utils/soundEffects';

interface GameModeScreenProps {
  language: LanguageCode;
  soundEnabled: boolean;
  onBack: () => void;
  onSelectMode: (mode: GameMode, durationSeconds: number) => void;
}

export const GameModeScreen: React.FC<GameModeScreenProps> = ({
  language,
  soundEnabled,
  onBack,
  onSelectMode,
}) => {
  const t = TRANSLATIONS[language];

  const handleStart = (mode: GameMode, duration: number) => {
    soundManager.playButtonClick(soundEnabled);
    onSelectMode(mode, duration);
  };

  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-5 flex flex-col justify-between text-white select-none">
      <div>
        {/* Top Navigation */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playButtonClick(soundEnabled);
              onBack();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition active:scale-95"
            aria-label={t.back}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-slate-100">{t.select_mode}</h2>
            <p className="text-xs text-slate-400">Choose your calculation battle style</p>
          </div>
        </div>

        {/* 3 Modes List */}
        <div className="mt-6 space-y-4">
          {/* Mode A: 1-Minute Challenge */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/80 to-slate-900/90 border border-blue-500/40 shadow-lg relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Timer className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {t.mode_1min_title}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/40">
                      60s
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-[210px] leading-relaxed">
                    {t.mode_1min_desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Standard Match • +10 pts</span>
              <button
                onClick={() => handleStart('one_minute', 60)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-700/30 active:scale-95 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.start_battle}</span>
              </button>
            </div>
          </div>

          {/* Mode B: 30-Second Speed Run */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/80 to-slate-900/90 border border-purple-500/40 shadow-lg relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {t.mode_30s_title}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-600/30 text-purple-300 border border-purple-500/40">
                      30s
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-[210px] leading-relaxed">
                    {t.mode_30s_desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Speed Blitz • +10 pts</span>
              <button
                onClick={() => handleStart('speed_run', 30)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-700/30 active:scale-95 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.start_battle}</span>
              </button>
            </div>
          </div>

          {/* Mode C: Endless Mode */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900/90 border border-emerald-500/40 shadow-lg relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <InfinityIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    {t.mode_endless_title}
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-600/30 text-emerald-300 border border-emerald-500/40">
                      Untimed
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-[210px] leading-relaxed">
                    {t.mode_endless_desc}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Relaxed • Finish anytime</span>
              <button
                onClick={() => handleStart('endless', 0)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-700/30 active:scale-95 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.start_battle}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-[11px] text-slate-400">
          💡 Correct answer awards <span className="text-amber-300 font-semibold">+10 Score</span>,{' '}
          <span className="text-sky-300 font-semibold">+5 Points</span>, and{' '}
          <span className="text-amber-400 font-semibold">+2 Coins</span>.
        </p>
      </div>
    </div>
  );
};
