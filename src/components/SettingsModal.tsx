/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Volume2, VolumeX, Music, Globe, RotateCcw, X, Check } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { soundManager } from '../utils/soundEffects';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  musicEnabled: boolean;
  onToggleMusic: (enabled: boolean) => void;
  soundEnabled: boolean;
  onToggleSound: (enabled: boolean) => void;
  language: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  musicEnabled,
  onToggleMusic,
  soundEnabled,
  onToggleSound,
  language,
  onSelectLanguage,
  onResetProgress,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden p-5 text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-xl font-bold tracking-wide flex items-center gap-2">
            ⚙️ {t.settings_title}
          </h2>
          <button
            onClick={() => {
              soundManager.playButtonClick(soundEnabled);
              onClose();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options List */}
        <div className="mt-4 space-y-4">
          {/* Music Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{t.music_label}</p>
                <p className="text-xs text-slate-400">{t.music_desc}</p>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !musicEnabled;
                onToggleMusic(next);
                soundManager.playButtonClick(soundEnabled);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                musicEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label={t.music_label}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform" />
            </button>
          </div>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-semibold">{t.sound_label}</p>
                <p className="text-xs text-slate-400">{t.sound_desc}</p>
              </div>
            </div>
            <button
              onClick={() => {
                const next = !soundEnabled;
                onToggleSound(next);
                if (next) soundManager.playButtonClick(true);
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                soundEnabled ? 'bg-purple-600 justify-end' : 'bg-slate-700 justify-start'
              }`}
              aria-label={t.sound_label}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60">
            <div className="flex items-center gap-2 mb-2 text-slate-300">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">{t.language_label}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  soundManager.playButtonClick(soundEnabled);
                  onSelectLanguage('en');
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium border transition ${
                  language === 'en'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span>English</span>
                {language === 'en' && <Check className="w-4 h-4 text-emerald-400" />}
              </button>

              <button
                onClick={() => {
                  soundManager.playButtonClick(soundEnabled);
                  onSelectLanguage('hi');
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium border transition ${
                  language === 'hi'
                    ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span>हिन्दी (Hindi)</span>
                {language === 'hi' && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Reset Game Progress */}
          <button
            onClick={() => {
              soundManager.playButtonClick(soundEnabled);
              if (window.confirm(t.reset_confirm)) {
                onResetProgress();
              }
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 hover:bg-red-900/40 text-xs font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.reset_data}</span>
          </button>
        </div>

        {/* Footer Button */}
        <div className="mt-5">
          <button
            onClick={() => {
              soundManager.playButtonClick(soundEnabled);
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium text-sm shadow-md hover:from-blue-500 hover:to-indigo-500 transition active:scale-95"
          >
            {t.save_settings}
          </button>
        </div>
      </div>
    </div>
  );
};
