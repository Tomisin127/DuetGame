export interface Obstacle {
  id: number;
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
}

export type GameStatus = 'menu' | 'playing' | 'gameOver';
