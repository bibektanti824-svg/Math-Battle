/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Math Battle Pure Game Logic & Data Models
 * Package: com.bibek.mathbattle
 */

export type OperationType = '+' | '−' | '×' | '÷';

export interface MathQuestion {
  id: string;
  operand1: number;
  operand2: number;
  operator: OperationType;
  displayText: string;
  correctAnswer: number;
  options: number[]; // exactly 4 distinct choices
}

export type GameMode = 'one_minute' | 'speed_run' | 'endless';

export interface RankLevelInfo {
  levelNumber: number; // 1 to 30
  tierName: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Legend';
  subLevel: 'I' | 'II' | 'III' | 'IV' | 'V';
  fullName: string;
  cumulativeThreshold: number; // total earned points needed
  incrementalRequirement: number; // additional points required from previous level
  coinReward: number;
  badgeColor: string;
}

export interface ThemeDefinition {
  id: string;
  nameKey: string;
  defaultName: string;
  cost: number;
  previewGradient: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  cardBg: string;
  bgClass: string;
}

export const THEMES: ThemeDefinition[] = [
  {
    id: 'ocean_blue',
    nameKey: 'theme_ocean_blue',
    defaultName: 'Ocean Blue',
    cost: 0,
    previewGradient: 'from-blue-600 via-indigo-700 to-sky-900',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    accentColor: '#38bdf8',
    cardBg: 'bg-blue-950/60 border-blue-500/30',
    bgClass: 'bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900',
  },
  {
    id: 'neon_purple',
    nameKey: 'theme_neon_purple',
    defaultName: 'Neon Purple',
    cost: 500,
    previewGradient: 'from-purple-600 via-fuchsia-700 to-purple-900',
    primaryColor: '#9333ea',
    secondaryColor: '#7e22ce',
    accentColor: '#e879f9',
    cardBg: 'bg-purple-950/60 border-purple-500/30',
    bgClass: 'bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900',
  },
  {
    id: 'forest_green',
    nameKey: 'theme_forest_green',
    defaultName: 'Forest Green',
    cost: 500,
    previewGradient: 'from-emerald-600 via-teal-700 to-green-900',
    primaryColor: '#059669',
    secondaryColor: '#047857',
    accentColor: '#34d399',
    cardBg: 'bg-emerald-950/60 border-emerald-500/30',
    bgClass: 'bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900',
  },
  {
    id: 'sunset_orange',
    nameKey: 'theme_sunset_orange',
    defaultName: 'Sunset Orange',
    cost: 600,
    previewGradient: 'from-orange-600 via-amber-700 to-red-900',
    primaryColor: '#ea580c',
    secondaryColor: '#c2410c',
    accentColor: '#fb923c',
    cardBg: 'bg-orange-950/60 border-orange-500/30',
    bgClass: 'bg-gradient-to-b from-slate-950 via-orange-950 to-neutral-900',
  },
  {
    id: 'midnight_black',
    nameKey: 'theme_midnight_black',
    defaultName: 'Midnight Black',
    cost: 750,
    previewGradient: 'from-neutral-800 via-zinc-900 to-black',
    primaryColor: '#475569',
    secondaryColor: '#334155',
    accentColor: '#94a3b8',
    cardBg: 'bg-zinc-900/80 border-zinc-700/50',
    bgClass: 'bg-gradient-to-b from-black via-zinc-950 to-neutral-900',
  },
  {
    id: 'candy_pink',
    nameKey: 'theme_candy_pink',
    defaultName: 'Candy Pink',
    cost: 600,
    previewGradient: 'from-pink-600 via-rose-600 to-purple-900',
    primaryColor: '#db2777',
    secondaryColor: '#be185d',
    accentColor: '#f472b6',
    cardBg: 'bg-pink-950/60 border-pink-500/30',
    bgClass: 'bg-gradient-to-b from-slate-950 via-pink-950 to-slate-900',
  },
  {
    id: 'golden_royale',
    nameKey: 'theme_golden_royale',
    defaultName: 'Golden Royale',
    cost: 1000,
    previewGradient: 'from-amber-500 via-yellow-600 to-amber-900',
    primaryColor: '#d97706',
    secondaryColor: '#b45309',
    accentColor: '#fcd34d',
    cardBg: 'bg-amber-950/60 border-amber-500/40',
    bgClass: 'bg-gradient-to-b from-slate-950 via-amber-950 to-neutral-950',
  },
  {
    id: 'cyber_cyan',
    nameKey: 'theme_cyber_cyan',
    defaultName: 'Cyber Cyan',
    cost: 800,
    previewGradient: 'from-cyan-500 via-teal-600 to-blue-900',
    primaryColor: '#0891b2',
    secondaryColor: '#0e7490',
    accentColor: '#22d3ee',
    cardBg: 'bg-cyan-950/60 border-cyan-500/30',
    bgClass: 'bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-900',
  },
];

const TIERS: Array<{ name: RankLevelInfo['tierName']; badgeColor: string; baseCoin: number }> = [
  { name: 'Bronze', badgeColor: '#cd7f32', baseCoin: 100 },
  { name: 'Silver', badgeColor: '#c0c0c0', baseCoin: 150 },
  { name: 'Gold', badgeColor: '#ffd700', baseCoin: 250 },
  { name: 'Platinum', badgeColor: '#00e5ff', baseCoin: 400 },
  { name: 'Diamond', badgeColor: '#b9f2ff', baseCoin: 600 },
  { name: 'Legend', badgeColor: '#ff4081', baseCoin: 1000 },
];

const SUB_LEVELS: Array<RankLevelInfo['subLevel']> = ['I', 'II', 'III', 'IV', 'V'];

/**
 * Generates the full 30 rank levels using the required arithmetic progression:
 * - Level 1 unlock threshold: 200 total earned points
 * - Each following level requires 50 more points than the previous level's incremental requirement.
 */
export function generateRankLevels(): RankLevelInfo[] {
  const levels: RankLevelInfo[] = [];
  let currentCumulative = 0;
  let currentIncremental = 200; // requirement for level 1

  for (let i = 1; i <= 30; i++) {
    const tierIndex = Math.floor((i - 1) / 5);
    const subIndex = (i - 1) % 5;
    const tier = TIERS[tierIndex];
    const sub = SUB_LEVELS[subIndex];

    if (i === 1) {
      currentIncremental = 200;
    } else {
      currentIncremental += 50;
    }
    currentCumulative += currentIncremental;

    levels.push({
      levelNumber: i,
      tierName: tier.name,
      subLevel: sub,
      fullName: `${tier.name} ${sub}`,
      cumulativeThreshold: currentCumulative,
      incrementalRequirement: currentIncremental,
      coinReward: tier.baseCoin,
      badgeColor: tier.badgeColor,
    });
  }

  return levels;
}

export const ALL_RANK_LEVELS = generateRankLevels();

/**
 * Computes current rank, progress, and next threshold given total earned points.
 */
export function calculateRankProgress(totalEarnedPoints: number) {
  // If points < level 1 threshold (200), player is "Novice" working toward Bronze I
  if (totalEarnedPoints < ALL_RANK_LEVELS[0].cumulativeThreshold) {
    const nextLevel = ALL_RANK_LEVELS[0];
    return {
      currentLevelNumber: 0,
      currentRankName: 'Unranked (Novice)',
      tierName: 'Unranked',
      subLevel: '-',
      isMaxLevel: false,
      currentPoints: totalEarnedPoints,
      previousThreshold: 0,
      nextThreshold: nextLevel.cumulativeThreshold,
      pointsInCurrentLevel: totalEarnedPoints,
      pointsNeededForNextLevel: nextLevel.cumulativeThreshold,
      progressFraction: Math.min(1, Math.max(0, totalEarnedPoints / nextLevel.cumulativeThreshold)),
    };
  }

  // Find the highest unlocked level
  let highestIndex = 0;
  for (let i = 0; i < ALL_RANK_LEVELS.length; i++) {
    if (totalEarnedPoints >= ALL_RANK_LEVELS[i].cumulativeThreshold) {
      highestIndex = i;
    } else {
      break;
    }
  }

  const currentLevel = ALL_RANK_LEVELS[highestIndex];
  const isMax = highestIndex === ALL_RANK_LEVELS.length - 1;

  if (isMax) {
    return {
      currentLevelNumber: currentLevel.levelNumber,
      currentRankName: currentLevel.fullName,
      tierName: currentLevel.tierName,
      subLevel: currentLevel.subLevel,
      isMaxLevel: true,
      currentPoints: totalEarnedPoints,
      previousThreshold: currentLevel.cumulativeThreshold,
      nextThreshold: currentLevel.cumulativeThreshold,
      pointsInCurrentLevel: totalEarnedPoints - currentLevel.cumulativeThreshold,
      pointsNeededForNextLevel: 0,
      progressFraction: 1,
    };
  }

  const nextLevel = ALL_RANK_LEVELS[highestIndex + 1];
  const prevThreshold = currentLevel.cumulativeThreshold;
  const neededSpan = nextLevel.cumulativeThreshold - prevThreshold;
  const pointsIntoCurrent = totalEarnedPoints - prevThreshold;
  const progressFraction = Math.min(1, Math.max(0, pointsIntoCurrent / neededSpan));

  return {
    currentLevelNumber: currentLevel.levelNumber,
    currentRankName: currentLevel.fullName,
    tierName: currentLevel.tierName,
    subLevel: currentLevel.subLevel,
    isMaxLevel: false,
    currentPoints: totalEarnedPoints,
    previousThreshold: prevThreshold,
    nextThreshold: nextLevel.cumulativeThreshold,
    pointsInCurrentLevel: pointsIntoCurrent,
    pointsNeededForNextLevel: neededSpan,
    progressFraction,
  };
}

/**
 * Safe random integer helper inclusive of min and max
 */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate a valid, clean math question
 * - Division avoids zero and produces whole numbers
 * - Subtraction produces non-negative numbers
 * - 4 distinct choices, randomized
 */
export function generateQuestion(previousDisplayText?: string): MathQuestion {
  const operations: OperationType[] = ['+', '−', '×', '÷'];
  let attempts = 0;

  while (attempts < 20) {
    attempts++;
    const op = operations[randomInt(0, 3)];
    let operand1 = 0;
    let operand2 = 0;
    let correctAnswer = 0;

    switch (op) {
      case '+': {
        operand1 = randomInt(2, 45);
        operand2 = randomInt(2, 45);
        correctAnswer = operand1 + operand2;
        break;
      }
      case '−': {
        const a = randomInt(5, 60);
        const b = randomInt(2, a); // ensures a >= b
        operand1 = a;
        operand2 = b;
        correctAnswer = operand1 - operand2;
        break;
      }
      case '×': {
        operand1 = randomInt(2, 12);
        operand2 = randomInt(2, 12);
        correctAnswer = operand1 * operand2;
        break;
      }
      case '÷': {
        operand2 = randomInt(2, 12); // divisor != 0
        const quotient = randomInt(1, 15);
        operand1 = operand2 * quotient; // ensures whole-number division
        correctAnswer = quotient;
        break;
      }
    }

    const displayText = `${operand1} ${op} ${operand2} = ?`;
    if (previousDisplayText && displayText === previousDisplayText && attempts < 15) {
      continue;
    }

    // Generate 3 unique wrong options
    const wrongOptions = new Set<number>();
    const offsets = [-3, -2, -1, 1, 2, 3, 4, 5, -4, 10, -10];

    // Shuffle offsets
    offsets.sort(() => Math.random() - 0.5);

    for (const offset of offsets) {
      const candidate = correctAnswer + offset;
      if (candidate >= 0 && candidate !== correctAnswer && !wrongOptions.has(candidate)) {
        wrongOptions.add(candidate);
      }
      if (wrongOptions.size === 3) break;
    }

    // Fallback if needed
    let filler = 1;
    while (wrongOptions.size < 3) {
      const candidate = correctAnswer + filler;
      if (candidate >= 0 && candidate !== correctAnswer && !wrongOptions.has(candidate)) {
        wrongOptions.add(candidate);
      }
      filler += 2;
    }

    const allOptions = [correctAnswer, ...Array.from(wrongOptions)];
    // Shuffle options
    allOptions.sort(() => Math.random() - 0.5);

    return {
      id: `q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      operand1,
      operand2,
      operator: op,
      displayText,
      correctAnswer,
      options: allOptions,
    };
  }

  // Guaranteed fallback
  return {
    id: `q_fallback_${Date.now()}`,
    operand1: 7,
    operand2: 8,
    operator: '+',
    displayText: '7 + 8 = ?',
    correctAnswer: 15,
    options: [13, 14, 15, 16],
  };
}

/**
 * Scoring constants as required:
 * Correct: +10 score, +5 earned points, +2 coins.
 * Incorrect: 0 score, 0 points, 0 coins.
 */
export const GAME_REWARDS = {
  CORRECT_SCORE: 10,
  CORRECT_POINTS: 5,
  CORRECT_COINS: 2,
};
