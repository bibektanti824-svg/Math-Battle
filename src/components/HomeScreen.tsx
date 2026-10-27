/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  Swords,
  Trophy,
  Palette,
  User,
  Share2,
  Settings,
  HeartHandshake,
  Coins,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { ThemeDefinition, calculateRankProgress } from '../game/mathBattleLogic';
import { soundManager } from '../utils/soundEffects';

interface HomeScreenProps {
  coins: number;
  earnedPoints: number;
  currentTheme: ThemeDefinition;
  language: LanguageCode;
  soundEnabled: boolean;
  onNavigate: (screen: 'game_mode' | 'rank_rewards' | 'theme_store' | 'about_creator' | 'support') => void;
  onOpenSettings: () => void;
  onOpenShare: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  coins,
  earnedPoints,
  currentTheme,
  language,
  soundEnabled,
  onNavigate,
  onOpenSettings,
  onOpenShare,
}) => {
  const t = TRANSLATIONS[language];
  const rankInfo = calculateRankProgress(earnedPoints);

  const handleAction = (cb: () => void) => {
    soundManager.playButtonClick(soundEnabled);
    cb();
  };

  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-5 flex flex-col justify-between text-white select-none">
      {/* Top Header Bar */}
      <div>
        <div className="flex items-center justify-between gap-2">
          {/* Coins Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/40 shadow-inner">
            <Coins className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-300 font-mono tracking-tight">
              {coins.toLocaleString()}
            </span>
          </div>

          {/* Quick Actions: Support (PhonePe) & Settings */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleAction(() => onNavigate('support'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-700 to-indigo-800 border border-purple-400/50 text-white text-xs font-semibold shadow-md hover:brightness-110 active:scale-95 transition"
              aria-label={t.menu_support}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-pink-300" />
              <span>Support ₹</span>
            </button>

            <button
              onClick={() => handleAction(onOpenSettings)}
              className="p-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition active:scale-95 shadow-sm"
              aria-label={t.settings_title}
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brand Header */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-2">
            <Swords className="w-7 h-7 text-sky-400" />
          </div>
          <h1 className="text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent">
            {t.app_name}
          </h1>
          <p className="text-[11px] text-slate-400 tracking-wide mt-0.5">{t.tagline}</p>
        </div>

        {/* Current Rank & Level Progress Card */}
        <div
          onClick={() => handleAction(() => onNavigate('rank_rewards'))}
          className="mt-4 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-700/70 backdrop-blur-md cursor-pointer hover:border-sky-500/50 transition group shadow-lg"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                {rankInfo.currentRankName}
              </span>
              {rankInfo.isMaxLevel && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  MAX
                </span>
              )}
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {earnedPoints.toLocaleString()} / {rankInfo.nextThreshold.toLocaleString()} pts
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.round(rankInfo.progressFraction * 100)}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full"
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
            <span>Level {rankInfo.currentLevelNumber}/30</span>
            <span className="text-sky-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition">
              {t.menu_rank} <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Main 5 Menu Action Cards */}
      <div className="my-4 space-y-2.5">
        {/* 1. Play Game - Hero Card */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction(() => onNavigate('game_mode'))}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 border border-blue-400/40 shadow-xl shadow-blue-900/30 text-left flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-wide">{t.menu_play}</h3>
                <span className="flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  <Flame className="w-2.5 h-2.5 mr-0.5 fill-current" /> HOT
                </span>
              </div>
              <p className="text-xs text-blue-100/80 mt-0.5">{t.menu_play_desc}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition" />
        </motion.button>

        {/* 2. Rank & Rewards */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction(() => onNavigate('rank_rewards'))}
          className="w-full p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-amber-500/40 text-left flex items-center justify-between group transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">{t.menu_rank}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.menu_rank_desc}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-amber-400 transition" />
        </motion.button>

        {/* 3. Theme Store */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction(() => onNavigate('theme_store'))}
          className="w-full p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-purple-500/40 text-left flex items-center justify-between group transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">{t.menu_theme}</h3>
                <span className="text-[10px] text-purple-300 font-mono">[{currentTheme.defaultName}]</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.menu_theme_desc}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-purple-400 transition" />
        </motion.button>

        {/* 4. About Creator */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction(() => onNavigate('about_creator'))}
          className="w-full p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-emerald-500/40 text-left flex items-center justify-between group transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">{t.menu_creator}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.menu_creator_desc}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-emerald-400 transition" />
        </motion.button>

        {/* 5. Share App */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction(onOpenShare)}
          className="w-full p-3.5 rounded-2xl bg-slate-900/80 border border-slate-700/80 hover:border-sky-500/40 text-left flex items-center justify-between group transition"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">{t.menu_share}</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">{t.menu_share_desc}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-sky-400 transition" />
        </motion.button>

        {/* Dedicated Support Creator Card */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction(() => onNavigate('support'))}
          className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-indigo-950/70 to-slate-900 border border-purple-500/40 hover:border-purple-400 text-left flex items-center justify-between group transition shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-400/30">
              <HeartHandshake className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{t.menu_support}</h3>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-600/40 text-purple-200 border border-purple-400/40">
                  PhonePe QR
                </span>
              </div>
              <p className="text-[11px] text-purple-200/80 mt-0.5">Voluntary creator contribution (₹5 or ₹10)</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition" />
        </motion.button>
      </div>

      {/* Footer Branding */}
      <div className="text-center pt-2 pb-1 border-t border-slate-800/60">
        <p className="text-[10px] text-slate-500 font-medium">
          Math Battle v1.0 • Crafted with dedication by Bibek Kumar Tanti
        </p>
      </div>
    </div>
  );
};
