/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, User, Heart, Smartphone, Sparkles, BookOpen } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { soundManager } from '../utils/soundEffects';

interface AboutCreatorScreenProps {
  language: LanguageCode;
  soundEnabled: boolean;
  onBack: () => void;
}

export const AboutCreatorScreen: React.FC<AboutCreatorScreenProps> = ({
  language,
  soundEnabled,
  onBack,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-5 flex flex-col justify-between text-white select-none">
      <div>
        {/* Navigation */}
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
            <h2 className="text-lg font-bold text-slate-100">{t.about_creator_title}</h2>
            <p className="text-xs text-slate-400">Story & journey behind Math Battle</p>
          </div>
        </div>

        {/* Creator Hero Banner */}
        <div className="mt-4 p-5 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 border border-indigo-500/30 text-center shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-600/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 mb-3 shadow-inner">
            <User className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-xl font-black text-white tracking-wide">
            {t.creator_name}
          </h3>
          <p className="text-xs text-indigo-300 font-medium mt-1 flex items-center justify-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" /> Mobile Developer & Learner
          </p>
        </div>

        {/* English Section */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-sky-400">
            <BookOpen className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              {t.english_story_title}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {t.english_story_text}
          </p>
        </div>

        {/* Visible Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <div className="p-1 rounded-full bg-slate-800 border border-slate-700 text-pink-400">
            <Heart className="w-3.5 h-3.5 fill-current" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        </div>

        {/* Hindi Section */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-2 mb-2 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">
              {t.hindi_story_title}
            </h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {t.hindi_story_text}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center pb-2">
        <p className="text-[11px] text-slate-500">
          Built with curiosity, patience, and love for mathematics.
        </p>
      </div>
    </div>
  );
};
