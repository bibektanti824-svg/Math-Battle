/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, Palette, Check, Coins, Sparkles } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { THEMES, ThemeDefinition } from '../game/mathBattleLogic';
import { soundManager } from '../utils/soundEffects';

interface ThemeStoreScreenProps {
  coins: number;
  ownedThemes: Set<string>;
  equippedThemeId: string;
  language: LanguageCode;
  soundEnabled: boolean;
  onBuyTheme: (theme: ThemeDefinition) => void;
  onEquipTheme: (themeId: string) => void;
  onBack: () => void;
}

export const ThemeStoreScreen: React.FC<ThemeStoreScreenProps> = ({
  coins,
  ownedThemes,
  equippedThemeId,
  language,
  soundEnabled,
  onBuyTheme,
  onEquipTheme,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleBuy = (theme: ThemeDefinition) => {
    soundManager.playButtonClick(soundEnabled);
    if (coins < theme.cost) {
      showToast(t.not_enough_coins);
      soundManager.playWrongSound(soundEnabled);
      return;
    }
    onBuyTheme(theme);
    showToast(t.theme_bought_success);
    soundManager.playRewardSound(soundEnabled);
  };

  const handleEquip = (themeId: string) => {
    soundManager.playButtonClick(soundEnabled);
    onEquipTheme(themeId);
    showToast(t.theme_equipped);
  };

  return (
    <div className="relative w-full h-full overflow-y-auto px-4 py-5 flex flex-col justify-between text-white select-none">
      <div>
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
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
              <h2 className="text-lg font-bold text-slate-100">{t.theme_store_title}</h2>
              <p className="text-xs text-slate-400">Unlock & equip battle themes</p>
            </div>
          </div>

          {/* Coin Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/40">
            <Coins className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-300 font-mono">
              {coins.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Feedback Toast */}
        {toastMessage && (
          <div className="mt-3 p-2.5 rounded-xl bg-blue-600/90 text-white text-xs font-semibold text-center border border-blue-400/50 shadow-lg animate-fade-in">
            {toastMessage}
          </div>
        )}

        {/* 8 Themes Grid */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {THEMES.map((theme) => {
            const isDefault = theme.cost === 0;
            const isOwned = isDefault || ownedThemes.has(theme.id);
            const isEquipped = equippedThemeId === theme.id;
            const canAfford = coins >= theme.cost;

            return (
              <div
                key={theme.id}
                className={`p-3.5 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                  isEquipped
                    ? 'bg-slate-900/95 border-sky-400 shadow-md shadow-sky-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Theme Color Preview Swatch */}
                <div
                  className={`w-full h-12 rounded-xl bg-gradient-to-r ${theme.previewGradient} flex items-center justify-between px-3 shadow-inner`}
                >
                  <span className="text-xs font-black tracking-wide text-white drop-shadow-md">
                    {theme.defaultName}
                  </span>
                  {isEquipped && (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white border border-white/30">
                      <Sparkles className="w-3 h-3 text-amber-300" /> Active
                    </span>
                  )}
                </div>

                {/* Price & Action */}
                <div className="mt-3 flex items-center justify-between pt-1">
                  <div>
                    {isDefault ? (
                      <span className="text-xs font-bold text-emerald-400 font-mono">
                        {t.theme_free}
                      </span>
                    ) : (
                      <span className="text-xs font-bold font-mono text-amber-300 flex items-center gap-1">
                        <Coins className="w-3.5 h-3.5 text-amber-400" />
                        {theme.cost} Coins
                      </span>
                    )}
                  </div>

                  <div>
                    {isEquipped ? (
                      <span className="px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center gap-1 border border-sky-500/30">
                        <Check className="w-3.5 h-3.5" />
                        {t.theme_equipped}
                      </span>
                    ) : isOwned ? (
                      <button
                        onClick={() => handleEquip(theme.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-600 transition active:scale-95"
                      >
                        {t.theme_equip}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBuy(theme)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition active:scale-95 ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-500 border border-slate-700'
                        }`}
                      >
                        {t.theme_buy}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
