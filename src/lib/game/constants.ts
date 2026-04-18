// Portrait orientation game canvas (9:16 aspect ratio)
export const GAME_CONFIG = {
  CANVAS_WIDTH: 450,
  CANVAS_HEIGHT: 800,
  CENTER_X: 225,
  CENTER_Y: 560,
  ORBIT_RADIUS: 75,
  CIRCLE_RADIUS: 16,
  OBSTACLE_SIZE: 22,
  BASE_OBSTACLE_SPEED: 2.5,
  OBSTACLE_SPAWN_INTERVAL: 800,
  DIFFICULTY_INCREASE_INTERVAL: 10000,
  DIFFICULTY_SPEED_MULTIPLIER: 0.2,
  MAX_DIFFICULTY: 10,
  FPS_TARGET: 60,
  ROTATION_SPEED: 0.06,
} as const;

// ERC-8021 Builder Code — attribution is computed via ox/erc8021 in src/lib/web3/provider.tsx
export const BUILDER_CODE = 'bc_928el9vb';

export const COLORS = {
  BACKGROUND: '#050a0f',
  CIRCLE_1: '#ef4444', // Red
  CIRCLE_2: '#3b82f6', // Blue
  OBSTACLE: '#ffffff',
  OBSTACLE_ACCENT: 'rgba(255, 255, 255, 0.8)',
  HUD_TEXT: '#ffffff',
  HUD_SECONDARY: '#94a3b8',
  PULSE_COLOR: '#3b82f620',
  ORBIT_COLOR: '#1e293b',
  GLOW_PRIMARY: '#ef4444',
  GLOW_SECONDARY: '#3b82f6',
} as const;

export const AUDIO_TRACKS = [
  'https://cdn.pixabay.com/audio/2022/03/10/audio_4ca5d8ee86.mp3',
  'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
] as const;
