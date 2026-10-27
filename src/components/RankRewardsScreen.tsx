/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Trophy, Check, Lock, Gift, Coins } from 'lucide-react';
import { LanguageCode, TRANSLATIONS } from '../utils/translations';
import { ALL_RANK_LEVELS, calculateRankProgress, RankLevelInfo } from '../game/mathBattleLogic';
import { soundManager } from '../utils/soundEffects';

interface RankRewardsScreenProps {
  earnedPoints: number;
  claimedRewards: Set<number>;
  language: LanguageCode;
  soundEnabled: boolean;
  onClaimReward: (levelNumber: number, coinReward: number) => void;
  onBack: () => void;
}

export const RankRewardsScreen: React.FC<RankRewardsScreenProps> = ({
  earnedPoints,
  claimedRewards,
  language,
  soundEnabled,
  onClaimReward,
  onBack,
}) => {
  const t = TRANSLATIONS[language];
  const rankInfo = calculateRankProgress(earnedPoints);

  const handleClaim = (lvl: RankLevelInfo) => {
    soundManager.playRewardSound(soundEnabled);
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    } catch {}
    onClaimReward(lvl.levelNumber, lvl.coinReward);
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
            <h2 className="text-lg font-bold text-slate-100">{t.rank_rewards_title}</h2>
            <p className="text-xs text-slate-400">{t.rank_system_desc}</p>
          </div>
        </div>

        {/* Current Standing Card */}
        <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 border border-blue-500/40 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">
                  Current Rank
                </p>
                <h3 className="text-base font-extrabold text-white">
                  {rankInfo.currentRankName}
                </h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {t.current_earned_points}
              </p>
              <p className="text-base font-black font-mono text-sky-400">
                {earnedPoints.toLocaleString()} pts
              </p>
            </div>
          </div>
        </div>

        {/* 30 Levels Ladder */}
        <div className="mt-4 space-y-2.5">
          {ALL_RANK_LEVELS.map((lvl) => {
            const isUnlocked = earnedPoints >= lvl.cumulativeThreshold;
            const isClaimed = claimedRewards.has(lvl.levelNumber);
            const canClaim = isUnlocked && !isClaimed;

            return (
              <div
                key={lvl.levelNumber}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between ${
                  isClaimed
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : isUnlocked
                    ? 'bg-slate-900/90 border-blue-500/40 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-900 text-slate-600'
                }`}
              >
                {/* Level Tier & Threshold */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs font-mono"
                    style={{
                      backgroundColor: `${lvl.badgeColor}22`,
                      color: lvl.badgeColor,
                      border: `1px solid ${lvl.badgeColor}55`,
                    }}
                  >
                    {lvl.levelNumber}
                  </div>
                  <div>
                    <h4
                      className="text-sm font-bold flex items-center gap-1.5"
                      style={{ color: isUnlocked ? lvl.badgeColor : undefined }}
                    >
                      {lvl.fullName}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400">
                      {lvl.cumulativeThreshold.toLocaleString()} {t.need_points}
                    </p>
                  </div>
                </div>

                {/* Reward & Claim Button */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center justify-end gap-1">
                      <Coins className="w-3 h-3 text-amber-400" /> +{lvl.coinReward}
                    </span>
                  </div>

                  {isClaimed ? (
                    <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-500 text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.claimed_status}</span>
                    </span>
                  ) : canClaim ? (
                    <button
                      onClick={() => handleClaim(lvl)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-700/30 active:scale-95 transition flex items-center gap-1 animate-pulse"
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{t.claim_reward_btn}</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-600 text-xs font-medium flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{t.locked_status}</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
