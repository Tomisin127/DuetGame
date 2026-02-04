import { Attribution } from 'ox/erc8021';

export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  CENTER_X: 400,
  CENTER_Y: 520,
  ORBIT_RADIUS: 60,
  CIRCLE_RADIUS: 15,
  OBSTACLE_SIZE: 20,
  BASE_OBSTACLE_SPEED: 2.5,
  OBSTACLE_SPAWN_INTERVAL: 800,
  DIFFICULTY_INCREASE_INTERVAL: 10000,
  DIFFICULTY_SPEED_MULTIPLIER: 0.2,
  MAX_DIFFICULTY: 10,
  FPS_TARGET: 60,
  ROTATION_SPEED: 0.06,
} as const;

// ERC-8021 Attribution Data Suffix for Builder Code
export const DATA_SUFFIX = Attribution.toDataSuffix({
  codes: ['bc_dh0rqw67'],
});

export const COLORS = {
  BACKGROUND: '#0a0a0f',
  CIRCLE_1: '#ef4444',
  CIRCLE_2: '#3b82f6',
  OBSTACLE: '#ffffff',
  OBSTACLE_ACCENT: '#ffffff',
  HUD_TEXT: '#ffffff',
  HUD_SECONDARY: '#888888',
  PULSE_COLOR: '#ec489920',
} as const;

export const AUDIO_TRACKS = [
  'https://cdn.pixabay.com/audio/2022/03/10/audio_4ca5d8ee86.mp3',
  'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
] as const;
