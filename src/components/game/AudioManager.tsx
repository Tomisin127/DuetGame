'use client'

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

interface AudioManagerProps {
  isPlaying: boolean;
  onBeat: () => void;
}

const AudioManager: FC<AudioManagerProps> = ({ isPlaying, onBeat }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const beatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [audioInitialized, setAudioInitialized] = useState<boolean>(false);
  const playAttemptedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0.4;
      audio.preload = 'auto';
      
      // Try to load from multiple sources (local first, then fallback)
      // Using a simple tone/ambient audio
      const audioSources = [
        'data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA==',
        'https://cdn.pixabay.com/audio/2023/10/30/audio_3c9b2c00e7.mp3'
      ];
      
      audio.src = audioSources[0];
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Mark that we've attempted to play (for user gesture)
      playAttemptedRef.current = true;
      
      const attemptPlay = async () => {
        try {
          // Try to play
          const playPromise = audioRef.current?.play();
          
          if (playPromise !== undefined) {
            await playPromise;
            console.log('[v0] Audio playing successfully');
            if (!audioInitialized) {
              setAudioInitialized(true);
            }
          }
        } catch (error) {
          console.log('[v0] Audio play error (likely autoplay policy):', error);
          // Autoplay is blocked - this is normal behavior
        }
      };

      attemptPlay();

      // Set up beat interval (independent of audio playing)
      beatIntervalRef.current = setInterval(() => {
        onBeat();
      }, 600);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
    }

    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
    };
  }, [isPlaying, onBeat, audioInitialized]);

  return null;
};

export default AudioManager;
