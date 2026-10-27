/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PhoneShell } from './components/PhoneShell';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { GameModeScreen } from './components/GameModeScreen';
import { GamePlayScreen } from './components/GamePlayScreen';
import { GameResultScreen } from './components/GameResultScreen';
import { RankRewardsScreen } from './components/RankRewardsScreen';
import { ThemeStoreScreen } from './components/ThemeStoreScreen';
import { AboutCreatorScreen } from './components/AboutCreatorScreen';
import { SupportScreen } from './components/SupportScreen';
import { SettingsModal } from './components/SettingsModal';
import { ShareModal } from './components/ShareModal';
import { AndroidProjectHub } from './components/AndroidProjectHub';

import { THEMES, ThemeDefinition, GameMode } from './game/mathBattleLogic';
import { LanguageCode } from './utils/translations';
import { soundManager } from './utils/soundEffects';

type ScreenType =
  | 'splash'
  | 'home'
  | 'game_mode'
  | 'game_play'
  | 'game_result'
  | 'rank_rewards'
  | 'theme_store'
  | 'about_creator'
  | 'support';

export default function App() {
  // Navigation State
  const [activeScreen, setActiveScreen] = useState<ScreenType>('splash');
  const [activeHubView, setActiveHubView] = useState<'simulator' | 'code'>('simulator');

  // Persistence State
  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('mathbattle_coins');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [earnedPoints, setEarnedPoints] = useState<number>(() => {
    const saved = localStorage.getItem('mathbattle_points');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [claimedRewards, setClaimedRewards] = useState<Set<number>>(() => {
    const saved = localStorage.getItem('mathbattle_claimed_rewards');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const [ownedThemes, setOwnedThemes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('mathbattle_owned_themes');
    const initial = saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
    initial.add('ocean_blue');
    return initial;
  });

  const [equippedThemeId, setEquippedThemeId] = useState<string>(() => {
    return localStorage.getItem('mathbattle_equipped_theme') || 'ocean_blue';
  });

  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('mathbattle_music');
    return saved !== null ? saved === 'true' : true;
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('mathbattle_sound');
    return saved !== null ? saved === 'true' : true;
  });

  const [language, setLanguage] = useState<LanguageCode>(() => {
    return (localStorage.getItem('mathbattle_lang') as LanguageCode) || 'en';
  });

  // Active Game State
  const [gameMode, setGameMode] = useState<GameMode>('one_minute');
  const [gameDuration, setGameDuration] = useState<number>(60);
  const [lastGameResult, setLastGameResult] = useState<{
    mode: GameMode;
    score: number;
    correctCount: number;
    incorrectCount: number;
    totalAnswered: number;
    pointsEarned: number;
    coinsEarned: number;
  }>({
    mode: 'one_minute',
    score: 0,
    correctCount: 0,
    incorrectCount: 0,
    totalAnswered: 0,
    pointsEarned: 0,
    coinsEarned: 0,
  });

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('mathbattle_coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('mathbattle_points', earnedPoints.toString());
  }, [earnedPoints]);

  useEffect(() => {
    localStorage.setItem('mathbattle_claimed_rewards', JSON.stringify(Array.from(claimedRewards)));
  }, [claimedRewards]);

  useEffect(() => {
    localStorage.setItem('mathbattle_owned_themes', JSON.stringify(Array.from(ownedThemes)));
  }, [ownedThemes]);

  useEffect(() => {
    localStorage.setItem('mathbattle_equipped_theme', equippedThemeId);
  }, [equippedThemeId]);

  useEffect(() => {
    localStorage.setItem('mathbattle_music', musicEnabled.toString());
    if (musicEnabled && activeScreen !== 'splash') {
      soundManager.startBackgroundMusic(true);
    } else {
      soundManager.stopBackgroundMusic();
    }
  }, [musicEnabled, activeScreen]);

  useEffect(() => {
    localStorage.setItem('mathbattle_sound', soundEnabled.toString());
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('mathbattle_lang', language);
  }, [language]);

  // Active Theme Definition
  const currentTheme = THEMES.find((t) => t.id === equippedThemeId) || THEMES[0];

  // Game Handlers
  const handleStartGame = (mode: GameMode, duration: number) => {
    setGameMode(mode);
    setGameDuration(duration);
    setActiveScreen('game_play');
  };

  const handleFinishGameRound = (results: typeof lastGameResult) => {
    // Record coins and points once
    setCoins((c) => c + results.coinsEarned);
    setEarnedPoints((p) => p + results.pointsEarned);
    setLastGameResult(results);
    setActiveScreen('game_result');
  };

  const handleClaimRankReward = (levelNumber: number, rewardCoins: number) => {
    if (claimedRewards.has(levelNumber)) return;
    setClaimedRewards((prev) => new Set([...prev, levelNumber]));
    setCoins((c) => c + rewardCoins);
  };

  const handleBuyTheme = (theme: ThemeDefinition) => {
    if (coins < theme.cost) return;
    setCoins((c) => c - theme.cost);
    setOwnedThemes((prev) => new Set([...prev, theme.id]));
    setEquippedThemeId(theme.id);
  };

  const handleResetProgress = () => {
    setCoins(0);
    setEarnedPoints(0);
    setClaimedRewards(new Set());
    setOwnedThemes(new Set(['ocean_blue']));
    setEquippedThemeId('ocean_blue');
    setIsSettingsOpen(false);
    setActiveScreen('home');
  };

  return (
    <PhoneShell
      currentTheme={currentTheme}
      activeView={activeHubView}
      onChangeView={(view) => setActiveHubView(view)}
    >
      {activeHubView === 'code' ? (
        <AndroidProjectHub />
      ) : (
        <>
          {activeScreen === 'splash' && (
            <SplashScreen
              language={language}
              soundEnabled={soundEnabled}
              onFinishSplash={() => setActiveScreen('home')}
            />
          )}

          {activeScreen === 'home' && (
            <HomeScreen
              coins={coins}
              earnedPoints={earnedPoints}
              currentTheme={currentTheme}
              language={language}
              soundEnabled={soundEnabled}
              onNavigate={(screen) => setActiveScreen(screen)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenShare={() => setIsShareOpen(true)}
            />
          )}

          {activeScreen === 'game_mode' && (
            <GameModeScreen
              language={language}
              soundEnabled={soundEnabled}
              onBack={() => setActiveScreen('home')}
              onSelectMode={handleStartGame}
            />
          )}

          {activeScreen === 'game_play' && (
            <GamePlayScreen
              mode={gameMode}
              durationSeconds={gameDuration}
              language={language}
              soundEnabled={soundEnabled}
              onFinishRound={handleFinishGameRound}
              onQuitEarly={() => setActiveScreen('home')}
            />
          )}

          {activeScreen === 'game_result' && (
            <GameResultScreen
              mode={lastGameResult.mode}
              score={lastGameResult.score}
              correctCount={lastGameResult.correctCount}
              incorrectCount={lastGameResult.incorrectCount}
              totalAnswered={lastGameResult.totalAnswered}
              pointsEarned={lastGameResult.pointsEarned}
              coinsEarned={lastGameResult.coinsEarned}
              totalCoins={coins}
              totalEarnedPoints={earnedPoints}
              language={language}
              soundEnabled={soundEnabled}
              onPlayAgain={() => setActiveScreen('game_play')}
              onGoHome={() => setActiveScreen('home')}
            />
          )}

          {activeScreen === 'rank_rewards' && (
            <RankRewardsScreen
              earnedPoints={earnedPoints}
              claimedRewards={claimedRewards}
              language={language}
              soundEnabled={soundEnabled}
              onClaimReward={handleClaimRankReward}
              onBack={() => setActiveScreen('home')}
            />
          )}

          {activeScreen === 'theme_store' && (
            <ThemeStoreScreen
              coins={coins}
              ownedThemes={ownedThemes}
              equippedThemeId={equippedThemeId}
              language={language}
              soundEnabled={soundEnabled}
              onBuyTheme={handleBuyTheme}
              onEquipTheme={(id) => setEquippedThemeId(id)}
              onBack={() => setActiveScreen('home')}
            />
          )}

          {activeScreen === 'about_creator' && (
            <AboutCreatorScreen
              language={language}
              soundEnabled={soundEnabled}
              onBack={() => setActiveScreen('home')}
            />
          )}

          {activeScreen === 'support' && (
            <SupportScreen
              language={language}
              soundEnabled={soundEnabled}
              onBack={() => setActiveScreen('home')}
            />
          )}

          {/* Settings Modal */}
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            musicEnabled={musicEnabled}
            onToggleMusic={(val) => setMusicEnabled(val)}
            soundEnabled={soundEnabled}
            onToggleSound={(val) => setSoundEnabled(val)}
            language={language}
            onSelectLanguage={(lang) => setLanguage(lang)}
            onResetProgress={handleResetProgress}
          />

          {/* Share Modal */}
          <ShareModal
            isOpen={isShareOpen}
            onClose={() => setIsShareOpen(false)}
            language={language}
            soundEnabled={soundEnabled}
          />
        </>
      )}
    </PhoneShell>
  );
}
