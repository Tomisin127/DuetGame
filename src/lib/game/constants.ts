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

// ERC-8021 Attribution Data Suffix for Builder Code (bc_928el9vb)
// Format: 0x8021 + builder code hex
export const DATA_SUFFIX = '0x0862635f3932386531396262800000000000000000000000000000000000000080218021';

export const COLORS = {
  BACKGROUND: '#050a0f',
  CIRCLE_1: '#38bdf8', // Sky blue
  CIRCLE_2: '#2dd4bf', // Teal/Cyan
  OBSTACLE: '#ffffff',
  OBSTACLE_ACCENT: 'rgba(255, 255, 255, 0.8)',
  HUD_TEXT: '#ffffff',
  HUD_SECONDARY: '#94a3b8',
  PULSE_COLOR: '#2dd4bf20',
  ORBIT_COLOR: '#1e293b',
  GLOW_PRIMARY: '#2dd4bf',
  GLOW_SECONDARY: '#38bdf8',
} as const;

export const AUDIO_TRACKS = [
  'https://cdn.pixabay.com/audio/2022/03/10/audio_4ca5d8ee86.mp3',
  'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3',
] as const;
