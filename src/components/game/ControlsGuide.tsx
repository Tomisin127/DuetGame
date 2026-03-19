'use client'

import type { FC } from 'react';
import { useEffect, useState } from 'react';

const ControlsGuide: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`hidden md:block fixed top-20 left-4 z-20 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {!isMinimized ? (
        <div className="bg-zinc-900/90 backdrop-blur-md border-2 border-zinc-700 rounded-2xl p-6 shadow-2xl max-w-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider">
              🎮 Controls
            </h3>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              ➖
            </button>
          </div>
          <div className="space-y-3 text-zinc-300">
            <div className="flex items-center gap-3">
              <span className="bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold">←</span>
              <span>or</span>
              <span className="bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold">A</span>
              <span className="text-sm">Left Circle</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold">→</span>
              <span>or</span>
              <span className="bg-zinc-700 px-3 py-1 rounded-lg font-mono text-white font-bold">D</span>
              <span className="text-sm">Right Circle</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-3 rounded-xl font-bold shadow-xl border-2 border-zinc-600 transition-all"
        >
          🎮 Controls
        </button>
      )}
    </div>
  );
};

export default ControlsGuide;
