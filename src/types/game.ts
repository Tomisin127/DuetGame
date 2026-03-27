export interface Obstacle {
  id: string | number;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'left' | 'right' | 'center';
}

export interface Circle {
  angle: number;
  direction: 'cw' | 'ccw';
  color: string;
}

export interface PowerUp {
  id: string | number;
  type: 'shield' | 'slowmo' | 'doubleSpin';
  angle: number;
  duration: number;
  createdAt: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  highScore: number;
  difficulty: number;
  startTime: number;
  obstacles: Obstacle[];
  circles: [Circle, Circle];
  isTransactionPending: boolean;
  lastObstacleSpawn: number;
  powerUps: PowerUp[];
  particles: Particle[];
  comboCount: number;
  lastSuccessTime: number;
  activeShield: boolean;
  slowMoEndTime: number;
  difficultyWave: number;
}

export type GameStatus = 'menu' | 'playing' | 'gameOver';

