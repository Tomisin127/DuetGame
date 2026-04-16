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

// ERC-8021 Attribution Data Suffix for Builder Code (bc_928el9vb)
// Your Builder Code: bc_928el9vb
export const BUILDER_CODE = 'bc_928el9vb';

// Pre-computed DATA_SUFFIX using Attribution.toDataSuffix({ codes: ['bc_928el9vb'] })
// This avoids the need to dynamically import ox/erc8021 which can cause SSR issues
// The suffix is the hex encoding of the builder code with ERC-8021 schema 0 format
export const DATA_SUFFIX = '0x62635f393238656c397662000e0080218021802180218021802180218021' as const;

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
