'use client'

import type { FC } from 'react';
import { useState } from 'react';

interface MobileControlsProps {
  onLeftControl: (active: boolean) => void;
  onRightControl: (active: boolean) => void;
}

const MobileControls: FC<MobileControlsProps> = ({ onLeftControl, onRightControl }) => {
  const [leftActive, setLeftActive] = useState<boolean>(false);
  const [rightActive, setRightActive] = useState<boolean>(false);

  const activate = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftActive(true);
      onLeftControl(true);
    } else {
      setRightActive(true);
      onRightControl(true);
    }
  };

  const deactivate = (side: 'left' | 'right') => {
    if (side === 'left') {
      setLeftActive(false);
      onLeftControl(false);
    } else {
      setRightActive(false);
      onRightControl(false);
    }
  };

  const makeHandlers = (side: 'left' | 'right') => ({
    onPointerDown: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).setPointerCapture?.(e.pointerId);
      activate(side);
    },
    onPointerUp: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      try {
        (e.currentTarget as HTMLButtonElement).releasePointerCapture?.(e.pointerId);
      } catch {}
      deactivate(side);
    },
    onPointerCancel: (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      deactivate(side);
    },
    onPointerLeave: () => {
      // Release if pointer leaves without lifting
      deactivate(side);
    },
    onContextMenu: (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault(),
  });

  const baseBtn =
    'w-24 h-24 rounded-full border-2 flex items-center justify-center text-4xl font-bold select-none transition-all duration-75 shadow-2xl';

  return (
    <div
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-30 flex gap-6"
      style={{ touchAction: 'none', WebkitUserSelect: 'none', userSelect: 'none' }}
      aria-label="Game controls"
    >
      <button
        type="button"
        {...makeHandlers('left')}
        className={`${baseBtn} ${
          leftActive
            ? 'bg-white text-black border-white scale-95'
            : 'bg-black/60 backdrop-blur text-white border-white/70 active:scale-95'
        }`}
        aria-label="Rotate counter-clockwise"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        type="button"
        {...makeHandlers('right')}
        className={`${baseBtn} ${
          rightActive
            ? 'bg-white text-black border-white scale-95'
            : 'bg-black/60 backdrop-blur text-white border-white/70 active:scale-95'
        }`}
        aria-label="Rotate clockwise"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

export default MobileControls;
