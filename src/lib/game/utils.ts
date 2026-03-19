import type { Obstacle, Circle } from '@/types/game';
import { GAME_CONFIG } from './constants';

export function checkCollision(
  circles: [Circle, Circle],
  obstacles: Obstacle[]
): boolean {
  const { CENTER_X, CENTER_Y, ORBIT_RADIUS, CIRCLE_RADIUS } = GAME_CONFIG;

  for (const obstacle of obstacles) {
    for (const circle of circles) {
      const circleX = CENTER_X + Math.cos(circle.angle) * ORBIT_RADIUS;
      const circleY = CENTER_Y + Math.sin(circle.angle) * ORBIT_RADIUS;

      const closestX = Math.max(
        obstacle.x,
        Math.min(circleX, obstacle.x + obstacle.width)
      );
      const closestY = Math.max(
        obstacle.y,
        Math.min(circleY, obstacle.y + obstacle.height)
      );

      const distanceX = circleX - closestX;
      const distanceY = circleY - closestY;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;

      if (distanceSquared < CIRCLE_RADIUS * CIRCLE_RADIUS) {
        return true;
      }
    }
  }

  return false;
}

export function spawnObstacle(difficulty: number): Obstacle {
  const types: Array<'left' | 'right' | 'center'> = ['left', 'right', 'center'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const size = GAME_CONFIG.OBSTACLE_SIZE;
  const width = size;
  const height = size;

  let x: number;
  const minX = GAME_CONFIG.CENTER_X - GAME_CONFIG.ORBIT_RADIUS * 2.5;
  const maxX = GAME_CONFIG.CENTER_X + GAME_CONFIG.ORBIT_RADIUS * 2.5 - width;
  
  x = minX + Math.random() * (maxX - minX);

  const speed =
    GAME_CONFIG.BASE_OBSTACLE_SPEED +
    difficulty * GAME_CONFIG.DIFFICULTY_SPEED_MULTIPLIER;

  return {
    id: Date.now() + Math.random(),
    x,
    y: -height,
    width,
    height,
    speed,
    type,
  };
}

export function updateObstacles(
  obstacles: Obstacle[],
  difficulty: number
): Obstacle[] {
  return obstacles
    .map((obstacle) => ({
      ...obstacle,
      y: obstacle.y + obstacle.speed,
    }))
    .filter((obstacle) => obstacle.y < GAME_CONFIG.CANVAS_HEIGHT + 100);
}

export function formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function calculateDifficulty(elapsedTime: number): number {
  const difficulty = Math.floor(
    elapsedTime / GAME_CONFIG.DIFFICULTY_INCREASE_INTERVAL
  );
  return Math.min(difficulty, GAME_CONFIG.MAX_DIFFICULTY);
}

export function getRandomAudioTrack(tracks: readonly string[]): string {
  return tracks[Math.floor(Math.random() * tracks.length)];
}
