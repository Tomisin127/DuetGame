'use client'

import type { FC, RefObject } from 'react';
import { useEffect, useRef } from 'react';
import type { GameState } from '@/types/game';
import { GAME_CONFIG, COLORS } from '@/lib/game/constants';

interface GameCanvasProps {
  gameState: GameState;
  pulseIntensity: number;
}

const GameCanvas: FC<GameCanvasProps> = ({ gameState, pulseIntensity }) => {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
  const containerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const gameStateRef = useRef<GameState>(gameState);
  const pulseRef = useRef<number>(pulseIntensity);
  const dprRef = useRef<number>(1);

  useEffect(() => {
    gameStateRef.current = gameState;
    pulseRef.current = pulseIntensity;
  }, [gameState, pulseIntensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = (): void => {
      const dpr = window.devicePixelRatio || 1;
      dprRef.current = dpr;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (): void => {
      const state = gameStateRef.current;
      const pulse = pulseRef.current;

      const dpr = dprRef.current;
      const cssWidth = window.innerWidth;
      const cssHeight = window.innerHeight;

      // Reset transform and clear at full device-pixel resolution
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = COLORS.BACKGROUND;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate aspect-preserving scale using CSS pixels, then multiply by DPR
      const scaleX = cssWidth / GAME_CONFIG.CANVAS_WIDTH;
      const scaleY = cssHeight / GAME_CONFIG.CANVAS_HEIGHT;
      const scale = Math.min(scaleX, scaleY);

      const scaledWidth = GAME_CONFIG.CANVAS_WIDTH * scale;
      const scaledHeight = GAME_CONFIG.CANVAS_HEIGHT * scale;
      const offsetX = (cssWidth - scaledWidth) / 2;
      const offsetY = (cssHeight - scaledHeight) / 2;

      ctx.save();
      ctx.translate(offsetX * dpr, offsetY * dpr);
      ctx.scale(scale * dpr, scale * dpr);

      // Pulse glow background
      const pulseGlow = Math.floor(pulse * 20);
      ctx.fillStyle = `rgb(${pulseGlow}, ${Math.floor(pulseGlow * 0.4)}, ${Math.floor(pulseGlow * 0.5)})`;
      ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

      if (pulse > 0.3) {
        ctx.shadowBlur = 60;
        ctx.shadowColor = COLORS.PULSE_COLOR;
        ctx.beginPath();
        ctx.arc(GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y, GAME_CONFIG.ORBIT_RADIUS + 40, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS.PULSE_COLOR;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Orbit ring
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y, GAME_CONFIG.ORBIT_RADIUS, 0, Math.PI * 2);
      ctx.stroke();

      // Center dot
      ctx.fillStyle = '#52525b';
      ctx.beginPath();
      ctx.arc(GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Obstacles
      state.obstacles.forEach((obstacle) => {
        if (state.difficultyWave > 3) {
          ctx.shadowBlur = 20;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        }

        ctx.fillStyle = COLORS.OBSTACLE;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.shadowBlur = 0;
      });

      // Particles
      state.particles.forEach((particle) => {
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Shield ring
      if (state.activeShield) {
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y, GAME_CONFIG.ORBIT_RADIUS + 50, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Player circles
      state.circles.forEach((circle) => {
        const x = GAME_CONFIG.CENTER_X + Math.cos(circle.angle) * GAME_CONFIG.ORBIT_RADIUS;
        const y = GAME_CONFIG.CENTER_Y + Math.sin(circle.angle) * GAME_CONFIG.ORBIT_RADIUS;

        ctx.shadowBlur = 30;
        ctx.shadowColor = circle.color;

        ctx.beginPath();
        ctx.arc(x, y, GAME_CONFIG.CIRCLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();

        ctx.shadowBlur = 0;

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      });

      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          imageRendering: 'crisp-edges',
          touchAction: 'none',
        }}
      />
    </div>
  );
};

export default GameCanvas;
