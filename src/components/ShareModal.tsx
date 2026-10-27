/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Share2, Copy, Check, X } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { soundManager } from '../utils/soundEffects';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
  soundEnabled: boolean;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  language,
  soundEnabled,
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  const handleNativeShare = async () => {
    soundManager.playButtonClick(soundEnabled);
    if (navigator.share) {
      try {
        await navigator.share({
          title: t.share_subject,
          text: t.share_text,
          url: window.location.href,
        });
        onClose();
        return;
      } catch {
        // User cancelled or share failed, fallback to copy
      }
    }
    handleCopy();
  };

  const handleCopy = () => {
    soundManager.playButtonClick(soundEnabled);
    navigator.clipboard.writeText(t.share_text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-5 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Share2 className="w-5 h-5 text-blue-400" />
            <span>{t.share_title}</span>
          </h2>
          <button
            onClick={() => {
              soundManager.playButtonClick(soundEnabled);
              onClose();
            }}
            className="p-1 rounded-full text-slate-400 hover:text-white"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 leading-relaxed">
          {t.share_text}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-medium text-sm flex items-center justify-center gap-2 transition active:scale-95 shadow-md"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.share_title}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className={`w-full py-2.5 rounded-xl border font-medium text-sm flex items-center justify-center gap-2 transition active:scale-95 ${
              copied
                ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copied : t.share_copy_btn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
