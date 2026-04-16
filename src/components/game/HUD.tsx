'use client'

import type { FC } from 'react';
import { formatTime } from '@/lib/game/utils';

interface HUDProps {
  score: number;
  highScore: number;
  elapsedTime: number;
  difficulty: number;
  combo?: number;
  shield?: boolean;
  slowMoActive?: boolean;
}

const HUD: FC<HUDProps> = ({
  score,
  highScore,
  elapsedTime,
  difficulty,
  combo = 0,
  shield = false,
  slowMoActive = false,
}) => {
  return (
    <div className="fixed top-[max(1rem,env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-20 px-4 pointer-events-none">
      <div className="flex gap-4 sm:gap-8">
        <div className="text-center">
          <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">Score</div>
          <div className="text-2xl sm:text-3xl font-light text-white tabular-nums">{score}</div>
        </div>

        <div className="text-center border-l border-r border-gray-700 px-4 sm:px-8">
          <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">Time</div>
          <div className="text-2xl sm:text-3xl font-light text-white tabular-nums">{formatTime(elapsedTime)}</div>
        </div>

        <div className="text-center">
          <div className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">Level</div>
          <div className="text-2xl sm:text-3xl font-light text-white tabular-nums">{difficulty + 1}</div>
        </div>
      </div>

      {combo > 0 && (
        <div className="text-center mt-3 animate-pulse">
          <div className="text-[10px] font-medium text-yellow-400 uppercase tracking-widest">Combo</div>
          <div className="text-xl font-light text-yellow-400 tabular-nums">{combo}x</div>
        </div>
      )}

      <div className="flex gap-2 justify-center mt-3 flex-wrap">
        {shield && (
          <div className="px-3 py-1 border border-yellow-500 rounded-full text-[10px] text-yellow-400 font-medium uppercase tracking-widest">
            Shield
          </div>
        )}
        {slowMoActive && (
          <div className="px-3 py-1 border border-cyan-500 rounded-full text-[10px] text-cyan-400 font-medium uppercase tracking-widest animate-pulse">
            Slow-Mo
          </div>
        )}
      </div>

      <div className="text-center mt-3 text-[10px] text-gray-500 uppercase tracking-widest font-light">
        Best: <span className="text-white font-medium ml-1">{highScore}</span>
      </div>
    </div>
  );
};

export default HUD;
