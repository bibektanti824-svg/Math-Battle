/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Swords, Sparkles } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { soundManager } from '../utils/soundEffects';

interface SplashScreenProps {
  language: LanguageCode;
  soundEnabled: boolean;
  onFinishSplash: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  language,
  soundEnabled,
  onFinishSplash,
}) => {
  const [hasCompleted, setHasCompleted] = useState(false);
  const t = TRANSLATIONS[language];

  const handleFinish = () => {
    if (!hasCompleted) {
      setHasCompleted(true);
      onFinishSplash();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFinish();
    }, 5000); // 5 seconds splash screen as requested

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={() => {
        soundManager.playButtonClick(soundEnabled);
        handleFinish();
      }}
      className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white cursor-pointer select-none overflow-hidden"
    >
      {/* Background Floating Math Symbols */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <motion.div
          animate={{ y: [-10, 20, -10], rotate: [0, 360] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute top-12 left-8 text-4xl font-mono text-blue-400"
        >
          ➕
        </motion.div>
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 right-10 text-3xl font-mono text-purple-400"
        >
          ✖️
        </motion.div>
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-28 left-12 text-3xl font-mono text-emerald-400"
        >
          ➗
        </motion.div>
        <motion.div
          animate={{ y: [10, -20, 10], rotate: [360, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/3 right-8 text-4xl font-mono text-amber-400"
        >
          −
        </motion.div>
      </div>

      {/* Main Animated Logo Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center text-center z-10"
      >
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-2xl shadow-blue-500/30 flex items-center justify-center">
            <div className="w-full h-full rounded-[22px] bg-slate-950/80 backdrop-blur-md flex items-center justify-center">
              <Swords className="w-12 h-12 text-sky-400" />
            </div>
          </div>
          <Sparkles className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 animate-pulse" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-black tracking-wider bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent uppercase"
        >
          {t.app_name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-2 text-xs text-sky-200/80 font-medium tracking-wide max-w-[240px]"
        >
          {t.tagline}
        </motion.p>
      </motion.div>

      {/* Animated Loading Bar */}
      <div className="absolute bottom-16 flex flex-col items-center gap-3 w-48">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 rounded-full"
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold animate-pulse">
          Tap anywhere to skip
        </span>
      </div>
    </div>
  );
};
