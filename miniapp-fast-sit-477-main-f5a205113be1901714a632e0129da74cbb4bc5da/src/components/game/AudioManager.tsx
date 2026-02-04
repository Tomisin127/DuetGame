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

  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.preload = 'auto';
      // Using a reliable cinematic dark ambient track
      audioRef.current.src = 'https://cdn.pixabay.com/audio/2023/10/30/audio_3c9b2c00e7.mp3';
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      // Initialize audio on first play (requires user interaction)
      if (!audioInitialized) {
        audioRef.current.load();
        setAudioInitialized(true);
      }

      // Attempt to play audio
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playing successfully');
          })
          .catch((error) => {
            console.log('Audio autoplay prevented:', error);
            // Try again after a short delay
            setTimeout(() => {
              if (audioRef.current) {
                audioRef.current.play().catch(() => {});
              }
            }, 100);
          });
      }

      // Set up beat interval
      beatIntervalRef.current = setInterval(() => {
        onBeat();
      }, 600);
    } else {
      audioRef.current.pause();
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
