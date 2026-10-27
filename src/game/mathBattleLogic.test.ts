/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateRankLevels,
  calculateRankProgress,
  generateQuestion,
  GAME_REWARDS,
  ALL_RANK_LEVELS,
} from './mathBattleLogic';

test('Rank levels count and hierarchy is exactly 30 levels', () => {
  const levels = generateRankLevels();
  assert.equal(levels.length, 30);
  assert.equal(levels[0].fullName, 'Bronze I');
  assert.equal(levels[4].fullName, 'Bronze V');
  assert.equal(levels[5].fullName, 'Silver I');
  assert.equal(levels[29].fullName, 'Legend V');
});

test('Rank threshold mathematical formula follows specification', () => {
  // Level 1: 200
  assert.equal(ALL_RANK_LEVELS[0].incrementalRequirement, 200);
  assert.equal(ALL_RANK_LEVELS[0].cumulativeThreshold, 200);

  // Level 2: +250 => 450
  assert.equal(ALL_RANK_LEVELS[1].incrementalRequirement, 250);
  assert.equal(ALL_RANK_LEVELS[1].cumulativeThreshold, 450);

  // Level 3: +300 => 750
  assert.equal(ALL_RANK_LEVELS[2].incrementalRequirement, 300);
  assert.equal(ALL_RANK_LEVELS[2].cumulativeThreshold, 750);

  // Level 4: +350 => 1100
  assert.equal(ALL_RANK_LEVELS[3].incrementalRequirement, 350);
  assert.equal(ALL_RANK_LEVELS[3].cumulativeThreshold, 1100);

  // Level 5: +400 => 1500
  assert.equal(ALL_RANK_LEVELS[4].incrementalRequirement, 400);
  assert.equal(ALL_RANK_LEVELS[4].cumulativeThreshold, 1500);

  // Verify all levels follow +50 step
  for (let i = 1; i < 30; i++) {
    const diff = ALL_RANK_LEVELS[i].incrementalRequirement - ALL_RANK_LEVELS[i - 1].incrementalRequirement;
    assert.equal(diff, 50, `Level ${i + 1} increment difference must be 50`);
    assert.equal(
      ALL_RANK_LEVELS[i].cumulativeThreshold,
      ALL_RANK_LEVELS[i - 1].cumulativeThreshold + ALL_RANK_LEVELS[i].incrementalRequirement
    );
  }
});

test('calculateRankProgress handles unranked, partial progress, and max level', () => {
  // 0 points
  const p0 = calculateRankProgress(0);
  assert.equal(p0.currentLevelNumber, 0);
  assert.equal(p0.isMaxLevel, false);
  assert.equal(p0.nextThreshold, 200);
  assert.equal(p0.progressFraction, 0);

  // 100 points
  const p100 = calculateRankProgress(100);
  assert.equal(p100.currentLevelNumber, 0);
  assert.equal(p100.progressFraction, 0.5);

  // Exact 200 points (Bronze I unlocked)
  const p200 = calculateRankProgress(200);
  assert.equal(p200.currentLevelNumber, 1);
  assert.equal(p200.currentRankName, 'Bronze I');
  assert.equal(p200.nextThreshold, 450);

  // 325 points (midway between Bronze I and Bronze II)
  const p325 = calculateRankProgress(325);
  assert.equal(p325.currentLevelNumber, 1);
  assert.equal(p325.currentRankName, 'Bronze I');
  // (325 - 200) / (450 - 200) = 125 / 250 = 0.5
  assert.equal(p325.progressFraction, 0.5);

  // Ultra high points (beyond 27750)
  const pMax = calculateRankProgress(99999);
  assert.equal(pMax.currentLevelNumber, 30);
  assert.equal(pMax.currentRankName, 'Legend V');
  assert.equal(pMax.isMaxLevel, true);
  assert.equal(pMax.progressFraction, 1);
});

test('Question generator produces valid arithmetic with 4 distinct options', () => {
  for (let i = 0; i < 50; i++) {
    const q = generateQuestion();
    assert.ok(q.displayText.length > 3);
    assert.equal(q.options.length, 4);

    // Options must be unique
    const unique = new Set(q.options);
    assert.equal(unique.size, 4, 'Options must have 4 distinct values');

    // Correct answer must be among options
    assert.ok(q.options.includes(q.correctAnswer), 'Options must contain correct answer');

    // Verify mathematical accuracy
    if (q.operator === '+') {
      assert.equal(q.operand1 + q.operand2, q.correctAnswer);
    } else if (q.operator === '−') {
      assert.equal(q.operand1 - q.operand2, q.correctAnswer);
      assert.ok(q.correctAnswer >= 0, 'Subtraction result should be >= 0');
    } else if (q.operator === '×') {
      assert.equal(q.operand1 * q.operand2, q.correctAnswer);
    } else if (q.operator === '÷') {
      assert.ok(q.operand2 > 0, 'Divisor cannot be zero');
      assert.equal(q.operand1 / q.operand2, q.correctAnswer);
      assert.equal(Number.isInteger(q.correctAnswer), true, 'Quotient must be integer');
    }
  }
});

test('Game rewards match requested specifications', () => {
  assert.equal(GAME_REWARDS.CORRECT_SCORE, 10);
  assert.equal(GAME_REWARDS.CORRECT_POINTS, 5);
  assert.equal(GAME_REWARDS.CORRECT_COINS, 2);
});
