import type { Obstacle, Circle, PowerUp, Particle } from '@/types/game';
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

// New mechanics utilities
export function spawnPowerUp(difficulty: number, centerX: number, centerY: number): PowerUp | null {
  // 5% chance per frame to spawn a power-up, increases slightly with difficulty
  const spawnChance = 0.05 + difficulty * 0.005;
  if (Math.random() > spawnChance) return null;

  const types: Array<'shield' | 'slowmo' | 'doubleSpin'> = ['shield', 'slowmo', 'doubleSpin'];
  const type = types[Math.floor(Math.random() * types.length)];

  return {
    id: Date.now() + Math.random(),
    type,
    angle: Math.random() * Math.PI * 2,
    duration: type === 'shield' ? 5000 : type === 'slowmo' ? 3000 : 4000,
    createdAt: Date.now(),
  };
}

export function checkPowerUpCollision(
  circles: [Circle, Circle],
  powerUps: PowerUp[],
  centerX: number,
  centerY: number,
  orbitRadius: number
): PowerUp | null {
  const { CIRCLE_RADIUS } = GAME_CONFIG;
  const checkRadius = CIRCLE_RADIUS * 2;

  for (const powerUp of powerUps) {
    for (const circle of circles) {
      const circleX = centerX + Math.cos(circle.angle) * orbitRadius;
      const circleY = centerY + Math.sin(circle.angle) * orbitRadius;

      const puX = centerX + Math.cos(powerUp.angle) * orbitRadius * 1.5;
      const puY = centerY + Math.sin(powerUp.angle) * orbitRadius * 1.5;

      const distanceX = circleX - puX;
      const distanceY = circleY - puY;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;

      if (distanceSquared < checkRadius * checkRadius) {
        return powerUp;
      }
    }
  }

  return null;
}

export function updatePowerUps(powerUps: PowerUp[]): PowerUp[] {
  const now = Date.now();
  return powerUps.filter((pu) => now - pu.createdAt < pu.duration);
}

export function createParticles(x: number, y: number, color: string, count: number = 8): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 2 + Math.random() * 4;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color,
    });
  }
  return particles;
}

export function updateParticles(particles: Particle[]): Particle[] {
  return particles
    .map((p) => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.vy + 0.15,
      life: p.life - 0.02,
    }))
    .filter((p) => p.life > 0);
}

export function calculateComboMultiplier(comboCount: number): number {
  return Math.min(1 + comboCount * 0.1, 2);
}
