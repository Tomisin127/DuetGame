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
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-20 px-4">
      <div className="flex gap-8 md:gap-12">
        <div className="text-center">
          <div className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Score</div>
          <div className="text-3xl md:text-4xl font-light text-white tabular-nums">{score}</div>
        </div>
        
        <div className="text-center border-l border-r border-gray-700 px-8 md:px-12">
          <div className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Time</div>
          <div className="text-3xl md:text-4xl font-light text-white tabular-nums">{formatTime(elapsedTime)}</div>
        </div>

        <div className="text-center">
          <div className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest mb-1">Level</div>
          <div className="text-3xl md:text-4xl font-light text-white tabular-nums">{difficulty + 1}</div>
        </div>
      </div>
      
      <div className="text-center mt-6 text-xs text-gray-500 uppercase tracking-widest font-light">
        Best: <span className="text-white font-medium ml-1">{highScore}</span>
      </div>
    </div>
  );
};

export default HUD;
