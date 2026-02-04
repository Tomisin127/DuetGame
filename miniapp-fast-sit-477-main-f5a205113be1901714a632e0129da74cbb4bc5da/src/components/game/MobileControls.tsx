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

  const handleTouchStart = (side: 'left' | 'right', e: React.TouchEvent | React.MouseEvent): void => {
    e.preventDefault();
    if (side === 'left') {
      onLeftControl(true);
    } else {
      onRightControl(true);
    }
  };

  const handleTouchEnd = (side: 'left' | 'right', e: React.TouchEvent | React.MouseEvent): void => {
    e.preventDefault();
    if (side === 'left') {
      onLeftControl(false);
    } else {
      onRightControl(false);
    }
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 pointer-events-auto">
      <div className="absolute inset-0 flex">
        {/* Left touch zone - covers left half of screen */}
        <div
          className="w-1/2 h-full"
          onTouchStart={(e) => handleTouchStart('left', e)}
          onTouchEnd={(e) => handleTouchEnd('left', e)}
          onMouseDown={(e) => handleTouchStart('left', e)}
          onMouseUp={(e) => handleTouchEnd('left', e)}
          onMouseLeave={(e) => handleTouchEnd('left', e)}
          style={{ touchAction: 'none' }}
        />

        {/* Right touch zone - covers right half of screen */}
        <div
          className="w-1/2 h-full"
          onTouchStart={(e) => handleTouchStart('right', e)}
          onTouchEnd={(e) => handleTouchEnd('right', e)}
          onMouseDown={(e) => handleTouchStart('right', e)}
          onMouseUp={(e) => handleTouchEnd('right', e)}
          onMouseLeave={(e) => handleTouchEnd('right', e)}
          style={{ touchAction: 'none' }}
        />
      </div>
    </div>
  );
};

export default MobileControls;
