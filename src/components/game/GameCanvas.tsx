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

  // Update refs when props change
  useEffect(() => {
    gameStateRef.current = gameState;
    pulseRef.current = pulseIntensity;
  }, [gameState, pulseIntensity]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = (): void => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const scaleX = width / GAME_CONFIG.CANVAS_WIDTH;
      const scaleY = height / GAME_CONFIG.CANVAS_HEIGHT;
      const scale = Math.min(scaleX, scaleY);

      const scaledWidth = GAME_CONFIG.CANVAS_WIDTH * scale;
      const scaledHeight = GAME_CONFIG.CANVAS_HEIGHT * scale;
      const offsetX = (width - scaledWidth) / 2;
      const offsetY = (height - scaledHeight) / 2;

      // Clear canvas
      ctx.fillStyle = COLORS.BACKGROUND;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      // Pulse effect
      const pulseGlow = Math.floor(pulse * 20);
      ctx.fillStyle = `rgb(${pulseGlow}, ${Math.floor(pulseGlow * 0.4)}, ${Math.floor(pulseGlow * 0.5)})`;
      ctx.fillRect(0, 0, GAME_CONFIG.CANVAS_WIDTH, GAME_CONFIG.CANVAS_HEIGHT);

      if (pulse > 0.3) {
        ctx.shadowBlur = 60;
        ctx.shadowColor = COLORS.PULSE_COLOR;
        ctx.beginPath();
        ctx.arc(
          GAME_CONFIG.CENTER_X,
          GAME_CONFIG.CENTER_Y,
          GAME_CONFIG.ORBIT_RADIUS + 40,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = COLORS.PULSE_COLOR;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Orbit circle
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        GAME_CONFIG.CENTER_X,
        GAME_CONFIG.CENTER_Y,
        GAME_CONFIG.ORBIT_RADIUS,
        0,
        Math.PI * 2
      );
      ctx.stroke();

      // Center dot
      ctx.fillStyle = '#52525b';
      ctx.beginPath();
      ctx.arc(GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Draw obstacles
      state.obstacles.forEach((obstacle) => {
        ctx.fillStyle = COLORS.OBSTACLE;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw circles
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

      // Continue animation loop
      if (state.isPlaying) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    // Start animation loop
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
        className="w-full h-full"
        style={{
          imageRendering: 'crisp-edges',
        }}
      />
    </div>
  );
};

export default GameCanvas;
