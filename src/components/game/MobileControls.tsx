'use client'

import type { FC } from 'react';

interface MobileControlsProps {
  onLeftControl: (active: boolean) => void;
  onRightControl: (active: boolean) => void;
}

const MobileControls: FC<MobileControlsProps> = ({ onLeftControl, onRightControl }) => {
  const makeHandlers = (side: 'left' | 'right') => {
    const activate = () => (side === 'left' ? onLeftControl(true) : onRightControl(true));
    const deactivate = () => (side === 'left' ? onLeftControl(false) : onRightControl(false));

    return {
      onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
        activate();
      },
      onPointerUp: (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        try { (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId); } catch {}
        deactivate();
      },
      onPointerCancel: (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        deactivate();
      },
      onPointerLeave: () => deactivate(),
      onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => e.preventDefault(),
    };
  };

  return (
    <>
      {/* Left half — rotate counter-clockwise */}
      <div
        className="fixed inset-y-0 left-0 z-30"
        style={{
          width: '50%',
          touchAction: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          cursor: 'pointer',
        }}
        aria-label="Rotate left"
        role="button"
        tabIndex={-1}
        {...makeHandlers('left')}
      />

      {/* Right half — rotate clockwise */}
      <div
        className="fixed inset-y-0 right-0 z-30"
        style={{
          width: '50%',
          touchAction: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          cursor: 'pointer',
        }}
        aria-label="Rotate right"
        role="button"
        tabIndex={-1}
        {...makeHandlers('right')}
      />
    </>
  );
};

export default MobileControls;
