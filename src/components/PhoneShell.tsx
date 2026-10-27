/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Smartphone, Maximize2, Minimize2, Code2, Play } from 'lucide-react';
import { ThemeDefinition } from '../game/mathBattleLogic';

interface PhoneShellProps {
  children: React.ReactNode;
  currentTheme: ThemeDefinition;
  activeView: 'simulator' | 'code';
  onChangeView: (view: 'simulator' | 'code') => void;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({
  children,
  currentTheme,
  activeView,
  onChangeView,
}) => {
  const [currentTime, setCurrentTime] = useState('10:45');
  const [isBezelMode, setIsBezelMode] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-between overflow-hidden font-sans">
      {/* Top Application Bar */}
      <header className="w-full h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚔️</span>
            <span className="font-extrabold text-sm sm:text-base tracking-wider bg-gradient-to-r from-white via-sky-200 to-blue-400 bg-clip-text text-transparent uppercase">
              Math Battle
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700 font-mono">
            com.bibek.mathbattle
          </span>
        </div>

        {/* View Switcher: Simulator vs Android Studio Files */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => onChangeView('simulator')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeView === 'simulator'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play Game</span>
          </button>

          <button
            onClick={() => onChangeView('code')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              activeView === 'code'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Android Studio Project</span>
          </button>
        </div>

        {/* Bezel Toggle */}
        {activeView === 'simulator' && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsBezelMode(!isBezelMode)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              title={isBezelMode ? 'Expand View' : 'Phone Bezel Frame'}
            >
              {isBezelMode ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full View</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3.5 h-3.5" />
                  <span>Phone Frame</span>
                </>
              )}
            </button>
          </div>
        )}
      </header>

      {/* Main View Container */}
      <main className="w-full flex-1 flex items-center justify-center p-0 sm:p-4 overflow-hidden relative">
        {activeView === 'code' ? (
          <div className="w-full h-full">
            {children}
          </div>
        ) : isBezelMode ? (
          /* Android Phone Bezel Frame */
          <div className="relative w-full max-w-[400px] h-full sm:h-[780px] max-h-screen sm:rounded-[44px] bg-slate-900 border-0 sm:border-8 sm:border-slate-800 shadow-2xl flex flex-col overflow-hidden sm:ring-1 sm:ring-slate-700/60">
            {/* Status Bar */}
            <div className="w-full h-8 px-6 pt-2 pb-1 flex items-center justify-between text-xs text-slate-300 font-mono select-none shrink-0 z-30 bg-slate-950/40 backdrop-blur-sm">
              <span className="font-semibold text-[11px]">{currentTime}</span>

              {/* Punch-hole camera */}
              <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-700 shadow-inner" />

              <div className="flex items-center gap-1.5 text-[11px]">
                <Signal className="w-3 h-3 text-slate-300" />
                <Wifi className="w-3 h-3 text-slate-300" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] font-bold">98%</span>
                  <Battery className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </div>
            </div>

            {/* Screen Viewport with Active Dynamic Theme Background */}
            <div
              className={`flex-1 w-full overflow-hidden flex flex-col relative transition-colors duration-500 ${currentTheme.bgClass}`}
            >
              {children}
            </div>

            {/* Android Navigation Gesture Bar */}
            <div className="w-full h-5 flex items-center justify-center shrink-0 bg-slate-950/40 backdrop-blur-sm">
              <div className="w-28 h-1 rounded-full bg-slate-500/60" />
            </div>
          </div>
        ) : (
          /* Full View */
          <div
            className={`w-full max-w-xl h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-800 ${currentTheme.bgClass}`}
          >
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
