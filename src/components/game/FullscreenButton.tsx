'use client'

import type { FC } from 'react';
import { useEffect, useState } from 'react';

const FullscreenButton: FC = () => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Detect support
    const el = document.documentElement as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };
    const supported =
      !!(el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen);
    setIsSupported(supported);

    const handleChange = () => {
      const d = document as Document & {
        webkitFullscreenElement?: Element | null;
        msFullscreenElement?: Element | null;
      };
      setIsFullscreen(
        !!(document.fullscreenElement || d.webkitFullscreenElement || d.msFullscreenElement)
      );
    };

    document.addEventListener('fullscreenchange', handleChange);
    document.addEventListener('webkitfullscreenchange', handleChange);
    document.addEventListener('msfullscreenchange', handleChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('msfullscreenchange', handleChange);
    };
  }, []);

  const toggleFullscreen = async (): Promise<void> => {
    try {
      const d = document as Document & {
        webkitFullscreenElement?: Element | null;
        webkitExitFullscreen?: () => Promise<void>;
        msFullscreenElement?: Element | null;
        msExitFullscreen?: () => Promise<void>;
      };

      const isCurrentlyFs = !!(
        document.fullscreenElement ||
        d.webkitFullscreenElement ||
        d.msFullscreenElement
      );

      if (!isCurrentlyFs) {
        const el = document.documentElement as HTMLElement & {
          webkitRequestFullscreen?: () => Promise<void>;
          msRequestFullscreen?: () => Promise<void>;
        };
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
        }

        // Try to lock orientation to portrait on mobile
        const anyScreen = screen as Screen & {
          orientation?: ScreenOrientation & { lock?: (o: string) => Promise<void> };
        };
        if (anyScreen.orientation?.lock) {
          try {
            await anyScreen.orientation.lock('portrait');
          } catch {
            // Ignore - orientation lock isn't supported everywhere
          }
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (d.webkitExitFullscreen) {
          await d.webkitExitFullscreen();
        } else if (d.msExitFullscreen) {
          await d.msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('[v0] Fullscreen toggle failed:', error);
    }
  };

  if (!isSupported) return null;

  return (
    <button
      onClick={toggleFullscreen}
      className="bg-black/70 backdrop-blur border border-white/60 px-3 py-2 text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-smooth flex items-center gap-2"
      title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      {isFullscreen ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 3v4a1 1 0 0 1-1 1H3" />
          <path d="M21 8h-4a1 1 0 0 1-1-1V3" />
          <path d="M3 16h4a1 1 0 0 1 1 1v4" />
          <path d="M16 21v-4a1 1 0 0 1 1-1h4" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        </svg>
      )}
      <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
    </button>
  );
};

export default FullscreenButton;
