'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance, useSendCalls } from 'wagmi';
import { base } from 'wagmi/chains';
import { formatEther, parseEther } from 'viem';
import type { GameState, GameStatus } from '@/types/game';
import { GAME_CONFIG, COLORS, BUILDER_CODE, DATA_SUFFIX } from '@/lib/game/constants';
import {
  checkCollision,
  spawnObstacle,
  calculateDifficulty,
  spawnPowerUp,
  checkPowerUpCollision,
  updatePowerUps,
  createParticles,
  updateParticles,
  calculateComboMultiplier,
} from '@/lib/game/utils';
import GameCanvas from '@/components/game/GameCanvas';
import HUD from '@/components/game/HUD';
import MobileControls from '@/components/game/MobileControls';
import AudioManager from '@/components/game/AudioManager';
import FullscreenButton from '@/components/game/FullscreenButton';
import StyledButton from '@/components/game/StyledButton';
import WalletConnectButton from '@/components/WalletConnectButton';

const MINIMUM_USD_REQUIRED = 0.000001;
const GAME_FEE_RECIPIENT = '0xEA549e458e77Fd93bf330e5EAEf730c50d8F5249';

export default function DuetGame() {
  const { address, isConnected, chain } = useAccount();
  const { connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { sendCallsAsync } = useSendCalls();
  const { data: balanceData } = useBalance({
    address: address,
    chainId: base.id,
  });

  const [gameStatus, setGameStatus] = useState<GameStatus>('menu');
  const [pulseIntensity, setPulseIntensity] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isCheckingBalance, setIsCheckingBalance] = useState<boolean>(false);
  const [isSigningTx, setIsSigningTx] = useState<boolean>(false);
  const [balanceError, setBalanceError] = useState<string>('');

  const [ethPrice, setEthPrice] = useState<number>(2500);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  const gameStateRef = useRef<GameState>({
    isPlaying: false,
    isPaused: false,
    score: 0,
    highScore: 0,
    difficulty: 0,
    startTime: 0,
    obstacles: [],
    circles: [
      { angle: 0, direction: 'cw', color: COLORS.CIRCLE_1 },
      { angle: Math.PI, direction: 'cw', color: COLORS.CIRCLE_2 },
    ],
    isTransactionPending: false,
    lastObstacleSpawn: 0,
    powerUps: [],
    particles: [],
    comboCount: 0,
    lastSuccessTime: 0,
    activeShield: false,
    slowMoEndTime: 0,
    difficultyWave: 0,
  });

  const [, forceUpdate] = useState<number>(0);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const leftControlActive = useRef<boolean>(false);
  const rightControlActive = useRef<boolean>(false);

  const fetchEthPrice = async (): Promise<number> => {
    try {
      const response = await fetch('/api/eth-price');
      const data: { ethPrice: number } = await response.json();
      return data.ethPrice;
    } catch (error) {
      console.error('[v0] Failed to fetch ETH price:', error);
      return 2500;
    }
  };

  const checkBalance = async (): Promise<boolean> => {
    if (!isConnected || !address) {
      setBalanceError('Please connect your wallet');
      return false;
    }

    try {
      setIsCheckingBalance(true);
      setBalanceError('');

      const currentEthPrice = await fetchEthPrice();
      setEthPrice(currentEthPrice);

      if (chain?.id !== base.id) {
        try {
          await switchChain?.({ chainId: base.id });
        } catch (e) {
          console.warn('[v0] Could not switch chain:', e);
        }
      }

      const balanceInEth = balanceData ? parseFloat(formatEther(balanceData.value)) : 0;
      const minimumEthRequired = MINIMUM_USD_REQUIRED / currentEthPrice;

      if (balanceInEth < minimumEthRequired) {
        setBalanceError(
          `Insufficient funds. You need ${minimumEthRequired.toFixed(6)} ETH ($${MINIMUM_USD_REQUIRED.toFixed(6)}). You have ${balanceInEth.toFixed(6)} ETH.`
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('[v0] Balance check error:', error);
      setBalanceError('Failed to check balance');
      return false;
    } finally {
      setIsCheckingBalance(false);
    }
  };

  const sendGameTransaction = async (): Promise<boolean> => {
    if (!address) {
      console.error('[v0] No address available for transaction');
      return false;
    }

    try {
      if (chain?.id !== base.id) {
        try {
          await switchChain?.({ chainId: base.id });
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (e) {
          console.warn('[v0] Chain switch failed, continuing:', e);
        }
      }

      const amountInEth = MINIMUM_USD_REQUIRED / ethPrice;
      const amountInWei = parseEther(amountInEth.toFixed(18));

      const currentBalance = balanceData ? parseFloat(formatEther(balanceData.value)) : 0;
      if (currentBalance < amountInEth) {
        setBalanceError(
          `Insufficient balance. Need ${amountInEth.toFixed(6)} ETH, have ${currentBalance.toFixed(6)} ETH`
        );
        return false;
      }

      console.log('[v0] Sending transaction:', {
        to: GAME_FEE_RECIPIENT,
        value: amountInWei.toString(),
        builderCode: BUILDER_CODE,
      });

      // The call resolves once the wallet has submitted the transaction.
      // If the user rejects, it throws. If it resolves, we treat it as success.
      await sendCallsAsync({
        calls: [
          {
            to: GAME_FEE_RECIPIENT as `0x${string}`,
            value: amountInWei,
          },
        ],
        capabilities: {
          dataSuffix: {
            value: DATA_SUFFIX,
            optional: true,
          },
        },
      });

      console.log('[v0] Transaction submitted successfully');
      return true;
    } catch (error: unknown) {
      console.error('[v0] Transaction error:', error);

      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as { message: string }).message;
        if (errorMessage.toLowerCase().includes('insufficient')) {
          setBalanceError('Insufficient funds including gas fees.');
        } else if (
          errorMessage.toLowerCase().includes('rejected') ||
          errorMessage.toLowerCase().includes('denied') ||
          errorMessage.toLowerCase().includes('user rejected') ||
          errorMessage.toLowerCase().includes('cancel')
        ) {
          setBalanceError('Transaction cancelled. Please sign to play.');
        } else {
          setBalanceError(`Transaction failed. Please try again.`);
        }
      } else {
        setBalanceError('Transaction failed. Please try again.');
      }

      return false;
    }
  };

  const startGameLoop = useCallback((): void => {
    const now = Date.now();
    gameStateRef.current = {
      ...gameStateRef.current,
      isPlaying: true,
      isPaused: false,
      score: 0,
      difficulty: 0,
      startTime: now,
      obstacles: [],
      isTransactionPending: false,
      lastObstacleSpawn: now,
      circles: [
        { angle: Math.PI * 1.5, direction: 'cw', color: COLORS.CIRCLE_1 },
        { angle: Math.PI * 0.5, direction: 'cw', color: COLORS.CIRCLE_2 },
      ],
      powerUps: [],
      particles: [],
      comboCount: 0,
      lastSuccessTime: now,
      activeShield: false,
      slowMoEndTime: 0,
      difficultyWave: 0,
    };

    setBalanceError('');
    setGameStatus('playing');
    forceUpdate((n) => n + 1);
    console.log('[v0] Game started');
  }, []);

  const startGame = async (): Promise<void> => {
    if (!isConnected) {
      setBalanceError('Please connect your wallet to play');
      return;
    }

    const hasBalance = await checkBalance();
    if (!hasBalance) return;

    gameStateRef.current.isTransactionPending = true;
    setIsSigningTx(true);
    setBalanceError('Sign the transaction in your wallet to play...');
    forceUpdate((n) => n + 1);

    const success = await sendGameTransaction();

    gameStateRef.current.isTransactionPending = false;
    setIsSigningTx(false);

    if (!success) {
      forceUpdate((n) => n + 1);
      return;
    }

    // Transaction accepted by wallet — start the game immediately
    startGameLoop();
  };

  const endGame = useCallback((): void => {
    gameStateRef.current.isPlaying = false;

    if (gameStateRef.current.score > gameStateRef.current.highScore) {
      gameStateRef.current.highScore = gameStateRef.current.score;

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('duet-highscore', gameStateRef.current.highScore.toString());
        } catch {}
      }
    }

    setGameStatus('gameOver');
  }, []);

  const resetGame = (): void => {
    setGameStatus('menu');
    setBalanceError('');
  };

  const handleBeat = useCallback((): void => {
    setPulseIntensity(1);
    setTimeout(() => setPulseIntensity(0), 200);
  }, []);

  const gameLoop = useCallback(
    (timestamp: number): void => {
      if (!gameStateRef.current.isPlaying) return;

      const deltaTime = lastFrameTimeRef.current ? (timestamp - lastFrameTimeRef.current) / (1000 / 60) : 1;
      lastFrameTimeRef.current = timestamp;

      const currentTime = Date.now();
      const elapsed = currentTime - gameStateRef.current.startTime;
      setElapsedTime(elapsed);

      const newDifficulty = calculateDifficulty(elapsed);
      gameStateRef.current.difficulty = newDifficulty;
      gameStateRef.current.difficultyWave = Math.floor(newDifficulty / 5);

      const rotationSpeed = GAME_CONFIG.ROTATION_SPEED * deltaTime;
      const effectiveDeltaTime =
        currentTime < gameStateRef.current.slowMoEndTime ? deltaTime * 0.5 : deltaTime;
      const slowFactor = currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1;

      if (leftControlActive.current) {
        gameStateRef.current.circles[0].angle -= rotationSpeed * slowFactor;
        gameStateRef.current.circles[1].angle -= rotationSpeed * slowFactor;
        gameStateRef.current.circles[0].direction = 'ccw';
        gameStateRef.current.circles[1].direction = 'ccw';
      }

      if (rightControlActive.current) {
        gameStateRef.current.circles[0].angle += rotationSpeed * slowFactor;
        gameStateRef.current.circles[1].angle += rotationSpeed * slowFactor;
        gameStateRef.current.circles[0].direction = 'cw';
        gameStateRef.current.circles[1].direction = 'cw';
      }

      const newPowerUp = spawnPowerUp(newDifficulty, GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y);
      if (newPowerUp) {
        gameStateRef.current.powerUps.push(newPowerUp);
      }

      const collectedPowerUp = checkPowerUpCollision(
        gameStateRef.current.circles,
        gameStateRef.current.powerUps,
        GAME_CONFIG.CENTER_X,
        GAME_CONFIG.CENTER_Y,
        GAME_CONFIG.ORBIT_RADIUS
      );

      if (collectedPowerUp) {
        gameStateRef.current.particles.push(
          ...createParticles(
            GAME_CONFIG.CENTER_X,
            GAME_CONFIG.CENTER_Y,
            collectedPowerUp.type === 'shield'
              ? '#FFD700'
              : collectedPowerUp.type === 'slowmo'
              ? '#00D9FF'
              : '#FF00FF',
            12
          )
        );

        if (collectedPowerUp.type === 'shield') {
          gameStateRef.current.activeShield = true;
          setTimeout(() => {
            gameStateRef.current.activeShield = false;
          }, 5000);
        } else if (collectedPowerUp.type === 'slowmo') {
          gameStateRef.current.slowMoEndTime = currentTime + 3000;
        } else if (collectedPowerUp.type === 'doubleSpin') {
          gameStateRef.current.comboCount = Math.min(gameStateRef.current.comboCount + 10, 100);
        }

        gameStateRef.current.powerUps = gameStateRef.current.powerUps.filter((pu) => pu.id !== collectedPowerUp.id);
        gameStateRef.current.score += Math.floor(50 * calculateComboMultiplier(gameStateRef.current.comboCount));
      }

      gameStateRef.current.powerUps = updatePowerUps(gameStateRef.current.powerUps);
      gameStateRef.current.particles = updateParticles(gameStateRef.current.particles);

      if (
        currentTime - gameStateRef.current.lastObstacleSpawn >
        GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL - newDifficulty * 100
      ) {
        gameStateRef.current.obstacles.push(spawnObstacle(newDifficulty));
        gameStateRef.current.lastObstacleSpawn = currentTime;
      }

      gameStateRef.current.obstacles = gameStateRef.current.obstacles.map((obstacle) => ({
        ...obstacle,
        y:
          obstacle.y +
          (GAME_CONFIG.BASE_OBSTACLE_SPEED + newDifficulty * GAME_CONFIG.DIFFICULTY_SPEED_MULTIPLIER) *
            effectiveDeltaTime,
      }));

      gameStateRef.current.obstacles = gameStateRef.current.obstacles.filter(
        (obstacle) => obstacle.y < GAME_CONFIG.CANVAS_HEIGHT
      );

      gameStateRef.current.score = Math.floor(elapsed / 100);

      if (currentTime - gameStateRef.current.lastSuccessTime > 1000) {
        gameStateRef.current.comboCount = Math.max(0, gameStateRef.current.comboCount - 1);
        gameStateRef.current.lastSuccessTime = currentTime;
      }

      if (checkCollision(gameStateRef.current.circles, gameStateRef.current.obstacles)) {
        if (!gameStateRef.current.activeShield) {
          endGame();
          return;
        } else {
          gameStateRef.current.obstacles = gameStateRef.current.obstacles.slice(1);
          gameStateRef.current.activeShield = false;
          gameStateRef.current.particles.push(
            ...createParticles(GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y, '#FFD700', 20)
          );
        }
      }

      if (gameStateRef.current.isPlaying) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    },
    [endGame]
  );

  useEffect(() => {
    if (gameStatus === 'playing' && gameStateRef.current.isPlaying) {
      lastFrameTimeRef.current = 0;
      const timeoutId = setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }, [gameStatus, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftControlActive.current = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightControlActive.current = true;
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') leftControlActive.current = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') rightControlActive.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedHighScore = localStorage.getItem('duet-highscore');
        if (savedHighScore) {
          gameStateRef.current.highScore = parseInt(savedHighScore, 10);
        }
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <AudioManager isPlaying={gameStatus === 'playing' && audioEnabled} onBeat={handleBeat} />

      {isConnected && gameStatus !== 'playing' && (
        <button
          onClick={() => disconnect()}
          className="fixed top-6 right-6 z-50 bg-black border border-white px-4 py-2 text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-smooth"
          title="Disconnect Wallet"
        >
          Disconnect
        </button>
      )}

      {gameStatus !== 'playing' && (
        <div className="fixed top-6 left-6 z-50">
          <FullscreenButton />
        </div>
      )}

      {gameStatus === 'menu' && (
        <div className="flex flex-col items-center justify-center gap-10 z-10 px-4 min-h-screen py-12">
          <div className="text-center animate-fade-in">
            <h1 className="text-7xl md:text-9xl font-light text-white tracking-tight mb-4">DUET</h1>
            <div className="h-px bg-white opacity-40 w-32 mx-auto mb-6" />
            <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest">
              On-Chain Survival Game
            </p>

            {gameStateRef.current.highScore > 0 && (
              <div className="mt-8 text-center border-t border-gray-800 pt-8">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Personal Best</p>
                <p className="text-5xl md:text-6xl font-light text-white">{gameStateRef.current.highScore}</p>
              </div>
            )}
          </div>

          {balanceError && (
            <div className="bg-red-900/30 backdrop-blur-md border border-red-700 px-6 py-4 max-w-md shadow-sm animate-fade-in">
              <p className="text-red-300 text-sm font-medium text-center">{balanceError}</p>
            </div>
          )}

          <div className="flex flex-col gap-6 items-center">
            {!isConnected ? (
              <div className="flex flex-col items-center gap-4">
                <WalletConnectButton />
                <p className="text-gray-400 text-xs text-center max-w-md uppercase tracking-widest font-light">
                  Connect your Base wallet. Entry fee: ${MINIMUM_USD_REQUIRED.toFixed(6)} USD ETH
                </p>
              </div>
            ) : (
              <StyledButton
                onClick={startGame}
                disabled={isCheckingBalance || isSigningTx}
                variant="primary"
                size="xl"
              >
                {isSigningTx ? 'Sign in wallet...' : isCheckingBalance ? 'Checking balance...' : 'Start Game'}
              </StyledButton>
            )}

            <div className="max-w-md border border-gray-800 pt-6 mt-2 px-4">
              <div className="text-gray-400 text-xs text-center space-y-3">
                <div>
                  <p className="font-medium text-white mb-1 uppercase tracking-widest">Controls</p>
                  <p className="text-xs font-light">Tap the left or right side of the screen to rotate</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1 uppercase tracking-widest">Objective</p>
                  <p className="text-xs font-light">Avoid the white obstacles to advance</p>
                </div>
                <p className="text-xs text-gray-500 font-light pt-2">Desktop: Arrow Keys or A / D</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameStatus === 'playing' && (
        <>
          <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
            <GameCanvas gameState={gameStateRef.current} pulseIntensity={pulseIntensity} />
          </div>

          <HUD
            score={gameStateRef.current.score}
            highScore={gameStateRef.current.highScore}
            elapsedTime={elapsedTime}
            difficulty={gameStateRef.current.difficulty}
            combo={gameStateRef.current.comboCount}
            shield={gameStateRef.current.activeShield}
            slowMoActive={Date.now() < gameStateRef.current.slowMoEndTime}
          />

          <div className="fixed top-4 left-4 z-40 flex gap-2">
            <FullscreenButton />
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="bg-black/70 backdrop-blur border border-white/60 px-3 py-2 text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-smooth"
              title={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {audioEnabled ? 'Sound On' : 'Sound Off'}
            </button>
          </div>

          <MobileControls
            onLeftControl={(active) => {
              leftControlActive.current = active;
            }}
            onRightControl={(active) => {
              rightControlActive.current = active;
            }}
          />
        </>
      )}

      {gameStatus === 'gameOver' && (
        <div className="flex flex-col items-center justify-center gap-10 z-10 px-4 py-12">
          <div className="text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-light text-white tracking-wider mb-2">GAME OVER</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 my-8" />

            <div className="mt-8">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Score</p>
              <p className="text-6xl md:text-7xl font-light text-white tabular-nums">{gameStateRef.current.score}</p>
            </div>

            {gameStateRef.current.highScore > gameStateRef.current.score && (
              <div className="mt-6 text-gray-400">
                <p className="text-xs font-medium uppercase tracking-widest mb-2">Best Score</p>
                <p className="text-2xl font-light text-gray-300">{gameStateRef.current.highScore}</p>
              </div>
            )}
          </div>

          {balanceError && (
            <div className="bg-red-900/30 backdrop-blur-md border border-red-700 px-6 py-4 max-w-md shadow-sm animate-fade-in">
              <p className="text-red-300 text-sm font-medium text-center">{balanceError}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <StyledButton onClick={startGame} disabled={isCheckingBalance || isSigningTx} variant="primary" size="lg">
              {isSigningTx ? 'Signing...' : isCheckingBalance ? 'Checking...' : 'Play Again'}
            </StyledButton>

            <StyledButton onClick={resetGame} variant="outline" size="lg">
              Menu
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
}
