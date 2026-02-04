'use client'

import type { FC } from 'react';
import { formatTime } from '@/lib/game/utils';

interface HUDProps {
  score: number;
  highScore: number;
  elapsedTime: number;
  difficulty: number;
}

const HUD: FC<HUDProps> = ({ score, highScore, elapsedTime, difficulty }) => {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 flex gap-2 z-20 px-2">
      <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg px-3 py-1.5 shadow-lg min-w-[70px]">
        <div className="text-zinc-400 text-[10px] uppercase tracking-wide">Score</div>
        <div className="text-white text-lg font-bold drop-shadow">{score}</div>
      </div>
      
      <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg px-3 py-1.5 shadow-lg min-w-[70px]">
        <div className="text-zinc-400 text-[10px] uppercase tracking-wide">Time</div>
        <div className="text-white text-lg font-bold drop-shadow">{formatTime(elapsedTime)}</div>
      </div>

      <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg px-3 py-1.5 shadow-lg min-w-[70px]">
        <div className="text-zinc-400 text-[10px] uppercase tracking-wide">Level</div>
        <div className="text-white text-lg font-bold drop-shadow">{difficulty + 1}</div>
      </div>

      <div className="bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-lg px-3 py-1.5 shadow-lg min-w-[70px]">
        <div className="text-zinc-400 text-[10px] uppercase tracking-wide">Best</div>
        <div className="text-white text-lg font-bold drop-shadow">{highScore}</div>
      </div>
    </div>
  );
};

export default HUD;
