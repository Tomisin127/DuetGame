'use client'

import type { FC } from 'react';
import { useEffect, useState } from 'react';

interface MobileControlsProps {
  onLeftControl: (active: boolean) => void;
  onRightControl: (active: boolean) => void;
}

const MobileControls: FC<MobileControlsProps> = ({
  onLeftControl,
  onRightControl,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [leftActive, setLeftActive] = useState<boolean>(false);
  const [rightActive, setRightActive] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleTouchStart = (side: 'left' | 'right', e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (side === 'left') {
      setLeftActive(true);
      onLeftControl(true);
    } else {
      setRightActive(true);
      onRightControl(true);
    }
  };

  const handleTouchEnd = (side: 'left' | 'right', e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (side === 'left') {
      setLeftActive(false);
      onLeftControl(false);
    } else {
      setRightActive(false);
      onRightControl(false);
    }
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 pointer-events-auto">
      <div className="absolute inset-0 flex">
        {/* Left touch zone with visual feedback */}
        <div
          className={`w-1/2 h-full transition-colors duration-75 ${
            leftActive ? 'bg-white/10' : 'bg-transparent'
          }`}
          onTouchStart={(e) => handleTouchStart('left', e)}
          onTouchEnd={(e) => handleTouchEnd('left', e)}
          onMouseDown={(e) => handleTouchStart('left', e)}
          onMouseUp={(e) => handleTouchEnd('left', e)}
          onMouseLeave={(e) => handleTouchEnd('left', e)}
          style={{ touchAction: 'none' }}
        >
          {leftActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/60 text-sm font-light tracking-widest">← CCW</div>
            </div>
          )}
        </div>

        {/* Right touch zone with visual feedback */}
        <div
          className={`w-1/2 h-full transition-colors duration-75 ${
            rightActive ? 'bg-white/10' : 'bg-transparent'
          }`}
          onTouchStart={(e) => handleTouchStart('right', e)}
          onTouchEnd={(e) => handleTouchEnd('right', e)}
          onMouseDown={(e) => handleTouchStart('right', e)}
          onMouseUp={(e) => handleTouchEnd('right', e)}
          onMouseLeave={(e) => handleTouchEnd('right', e)}
          style={{ touchAction: 'none' }}
        >
          {rightActive && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/60 text-sm font-light tracking-widest">CW →</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
