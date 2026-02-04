'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance, useSendCalls } from 'wagmi';
import { base } from 'wagmi/chains';
import { formatEther, parseEther } from 'viem';
import { useWalletClient } from 'wagmi';
import type { GameState, GameStatus } from '@/types/game';
import { GAME_CONFIG, COLORS, DATA_SUFFIX } from '@/lib/game/constants';
import {
  checkCollision,
  spawnObstacle,
  updateObstacles,
  calculateDifficulty,
} from '@/lib/game/utils';
import GameCanvas from '@/components/game/GameCanvas';
import HUD from '@/components/game/HUD';
import MobileControls from '@/components/game/MobileControls';
import AudioManager from '@/components/game/AudioManager';
import ControlsGuide from '@/components/game/ControlsGuide';
import WalletDisplay from '@/components/game/WalletDisplay';
import StyledButton from '@/components/game/StyledButton';
import WalletConnectButton from '@/components/WalletConnectButton';
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";
import { useBaseAppWallet } from "@/hooks/useBaseAppWallet";

const MINIMUM_USD_REQUIRED = 0.0001;
const GAME_FEE_RECIPIENT = '0xEA549e458e77Fd93bf330e5EAEf730c50d8F5249';

export default function DuetGame() {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster()
    useQuickAuth(isInFarcaster)
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const { sendCalls } = useSendCalls();
  const { data: balanceData } = useBalance({
    address: address,
    chainId: base.id,
  });
  
  const [pendingCallsId, setPendingCallsId] = useState<string | null>(null);
  
  const [gameStatus, setGameStatus] = useState<GameStatus>('menu');
  const [pulseIntensity, setPulseIntensity] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isCheckingBalance, setIsCheckingBalance] = useState<boolean>(false);
  const [balanceError, setBalanceError] = useState<string>('');

  const [ethPrice, setEthPrice] = useState<number>(2500);
  const [walletBalance, setWalletBalance] = useState<string>('0.0000');
  const [walletBalanceUSD, setWalletBalanceUSD] = useState<string>('0.00');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [audioReady, setAudioReady] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { isBaseApp, autoConnect } = useBaseAppWallet();

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
      console.error('Failed to fetch ETH price:', error);
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

      // Switch to Base chain if not already on it
      if (chain?.id !== base.id) {
        await switchChain?.({ chainId: base.id });
      }

      const balanceInEth = balanceData ? parseFloat(formatEther(balanceData.value)) : 0;
      const balanceInUSD = balanceInEth * currentEthPrice;

      setWalletBalance(balanceInEth.toFixed(6));
      setWalletBalanceUSD(balanceInUSD.toFixed(2));

      const minimumEthRequired = MINIMUM_USD_REQUIRED / currentEthPrice;

      if (balanceInUSD < MINIMUM_USD_REQUIRED) {
        setBalanceError(
          `Insufficient funds. You need at least $${MINIMUM_USD_REQUIRED.toFixed(3)} (≈${minimumEthRequired.toFixed(6)} ETH) to play.`
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error('Balance check error:', error);
      setBalanceError('Failed to check balance');
      return false;
    } finally {
      setIsCheckingBalance(false);
    }
  };

  const sendGameTransaction = async (): Promise<boolean> => {
    if (!address) return false;

    try {
      // Switch to Base chain if not already on it
      if (chain?.id !== base.id) {
        await switchChain?.({ chainId: base.id });
        // Wait a bit for chain switch to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const amountInEth = MINIMUM_USD_REQUIRED / ethPrice;
      const amountInWei = parseEther(amountInEth.toFixed(18));

      console.log('Initiating transaction with builder code attribution...');
      console.log('Builder Code:', 'bc_p5fu4k4i');
      console.log('Data Suffix:', DATA_SUFFIX);

      // Send transaction with ERC-8021 attribution
      // This will prompt the user's wallet to sign the transaction
      const callsId = await sendCalls({
        calls: [
          {
            to: GAME_FEE_RECIPIENT as `0x${string}`,
            value: amountInWei,
            data: '0x44756574', // "Duet" in hex
          },
        ],
        capabilities: {
          dataSuffix: {
            value: DATA_SUFFIX,
            optional: false, // Make it required to ensure attribution
          },
        },
      });

      console.log('✅ Transaction signed and submitted with ERC-8021 attribution');
      console.log('Calls ID:', callsId);
      console.log('Builder attribution successfully attached to transaction');
      
      return true;
    } catch (error: unknown) {
      console.error('❌ Transaction error:', error);
      
      // Check if user rejected the transaction
      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as { message: string }).message;
        if (errorMessage.includes('rejected') || errorMessage.includes('denied') || errorMessage.includes('User rejected')) {
          setBalanceError('Transaction cancelled. Please sign the transaction to play.');
        } else {
          setBalanceError('Transaction failed. Please try again.');
        }
      } else {
        setBalanceError('Transaction failed. Please try again.');
      }
      
      return false;
    }
  };

  const startGame = async (): Promise<void> => {
    if (!isConnected) {
      setBalanceError('Please connect your wallet to play');
      return;
    }

    // Check balance
    const hasBalance = await checkBalance();
    if (!hasBalance) return;

    // Set transaction pending state - wallet will popup for signature
    gameStateRef.current.isTransactionPending = true;
    setBalanceError('⏳ Please sign the transaction in your wallet...');
    forceUpdate((n) => n + 1);

    // Wait for user to sign the transaction
    // The wallet modal will appear and block until user signs or rejects
    const txSuccess = await sendGameTransaction();
    
    // If transaction failed or was rejected, stop here
    if (!txSuccess) {
      gameStateRef.current.isTransactionPending = false;
      forceUpdate((n) => n + 1);
      return;
    }

    // Transaction successfully signed! Now start the game
    console.log('🎮 Transaction confirmed - Starting game...');
    setAudioEnabled(true);

    gameStateRef.current = {
      ...gameStateRef.current,
      isPlaying: true,
      isPaused: false,
      score: 0,
      difficulty: 0,
      startTime: Date.now(),
      obstacles: [],
      isTransactionPending: false,
      lastObstacleSpawn: Date.now(),
      circles: [
        { angle: Math.PI * 1.5, direction: 'cw', color: COLORS.CIRCLE_1 },
        { angle: Math.PI * 0.5, direction: 'cw', color: COLORS.CIRCLE_2 },
      ],
    };

    setGameStatus('playing');
    setElapsedTime(0);
    setBalanceError('');
  };

  const endGame = useCallback((): void => {
    gameStateRef.current.isPlaying = false;
    
    if (gameStateRef.current.score > gameStateRef.current.highScore) {
      gameStateRef.current.highScore = gameStateRef.current.score;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('duet-highscore', gameStateRef.current.highScore.toString());
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

  const gameLoop = useCallback((timestamp: number): void => {
    if (!gameStateRef.current.isPlaying) return;

    // Calculate delta time for smooth interpolation
    const deltaTime = lastFrameTimeRef.current ? (timestamp - lastFrameTimeRef.current) / (1000 / 60) : 1;
    lastFrameTimeRef.current = timestamp;

    const currentTime = Date.now();
    const elapsed = currentTime - gameStateRef.current.startTime;
    setElapsedTime(elapsed);

    const newDifficulty = calculateDifficulty(elapsed);
    gameStateRef.current.difficulty = newDifficulty;

    // Apply delta time to rotation for smooth animation
    const rotationSpeed = GAME_CONFIG.ROTATION_SPEED * deltaTime;
    
    if (leftControlActive.current) {
      gameStateRef.current.circles[0].angle -= rotationSpeed;
      gameStateRef.current.circles[1].angle -= rotationSpeed;
      gameStateRef.current.circles[0].direction = 'ccw';
      gameStateRef.current.circles[1].direction = 'ccw';
    }

    if (rightControlActive.current) {
      gameStateRef.current.circles[0].angle += rotationSpeed;
      gameStateRef.current.circles[1].angle += rotationSpeed;
      gameStateRef.current.circles[0].direction = 'cw';
      gameStateRef.current.circles[1].direction = 'cw';
    }

    if (
      currentTime - gameStateRef.current.lastObstacleSpawn >
      GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL - newDifficulty * 100
    ) {
      gameStateRef.current.obstacles.push(spawnObstacle(newDifficulty));
      gameStateRef.current.lastObstacleSpawn = currentTime;
    }

    // Update obstacles with delta time for smooth movement
    gameStateRef.current.obstacles = gameStateRef.current.obstacles.map(obstacle => ({
      ...obstacle,
      y: obstacle.y + (GAME_CONFIG.BASE_OBSTACLE_SPEED + newDifficulty * GAME_CONFIG.DIFFICULTY_SPEED_MULTIPLIER) * deltaTime,
    }));

    gameStateRef.current.obstacles = gameStateRef.current.obstacles.filter(
      (obstacle) => obstacle.y < GAME_CONFIG.CANVAS_HEIGHT
    );

    gameStateRef.current.score = Math.floor(elapsed / 100);

    if (checkCollision(gameStateRef.current.circles, gameStateRef.current.obstacles)) {
      endGame();
      return;
    }

    // Continue the animation loop
    if (gameStateRef.current.isPlaying) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
  }, [endGame]);

  useEffect(() => {
    if (gameStatus === 'playing' && gameStateRef.current.isPlaying) {
      lastFrameTimeRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(gameLoop);
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [gameStatus, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        leftControlActive.current = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        rightControlActive.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        leftControlActive.current = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        rightControlActive.current = false;
      }
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
      const savedHighScore = localStorage.getItem('duet-highscore');
      if (savedHighScore) {
        gameStateRef.current.highScore = parseInt(savedHighScore, 10);
      }
    }
  }, []);

  useEffect(() => {
    setPulseIntensity((prev) => Math.max(0, prev - 0.05));
  }, []);

  // Handle background audio - create once and setup interaction listeners
  useEffect(() => {
    const audio = new Audio('https://ia601905.us.archive.org/27/items/tvtunes_17714/28%20Days%20Later.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    
    let audioStarted = false;

    // Function to start audio on user interaction
    const startAudioOnInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !audioStarted) {
        audioRef.current.play()
          .then(() => {
            audioStarted = true;
            console.log('Background audio started on user interaction');
          })
          .catch((error) => {
            console.log('Audio play blocked:', error);
          });
      }
    };

    // Try autoplay first (will fail in most mobile browsers)
    audio.play().catch(() => {
      console.log('Autoplay blocked - waiting for user interaction');
    });

    // Listen for user interactions to start audio
    // Using capture phase to catch events early
    const events = ['click', 'touchstart', 'touchend', 'keydown', 'pointerdown'];
    events.forEach(event => {
      document.addEventListener(event, startAudioOnInteraction, { capture: true });
    });

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      events.forEach(event => {
        document.removeEventListener(event, startAudioOnInteraction, { capture: true });
      });
    };
  }, []);

  // Auto-connect wallet in embedded environments
  useEffect(() => {
    if ((isInFarcaster || isBaseApp) && !isConnected) {
      const timer = setTimeout(() => {
        autoConnect();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInFarcaster, isBaseApp, isConnected, autoConnect]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(63,63,70,0.3),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(82,82,91,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(39,39,42,0.2),transparent_50%)]" />
      
      <AudioManager
        isPlaying={gameStatus === 'playing' && audioEnabled}
        onBeat={handleBeat}
      />

      {/* Logout Button - Top Right (Hidden during gameplay) */}
      {isConnected && gameStatus !== 'playing' && (
        <button
          onClick={() => disconnect()}
          className="fixed top-4 right-4 z-50 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-lg px-3 py-1.5 shadow-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all text-white text-sm font-semibold uppercase tracking-wide"
          title="Disconnect Wallet"
        >
          🚪 Logout
        </button>
      )}

      {gameStatus === 'menu' && (
        <div className="flex flex-col items-center gap-8 z-10 px-4">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-zinc-600 blur-3xl opacity-30 animate-pulse" />
              <h1 className="relative text-7xl md:text-9xl font-black text-white tracking-wider drop-shadow-2xl">
                DUET
              </h1>
            </div>
            <div className="bg-zinc-800 text-zinc-300 px-6 py-3 rounded-2xl shadow-2xl border-2 border-zinc-700 backdrop-blur-sm">
              <p className="text-xl md:text-2xl font-bold uppercase tracking-widest">
                On-Chain Survival Game
              </p>
            </div>
            {gameStateRef.current.highScore > 0 && (
              <div className="mt-6 bg-zinc-800/80 backdrop-blur-md border-2 border-zinc-600 rounded-2xl px-8 py-4 shadow-2xl">
                <p className="text-zinc-400 text-sm uppercase tracking-wider mb-1">Personal Best</p>
                <p className="text-white text-4xl md:text-5xl font-black drop-shadow-lg">
                  {gameStateRef.current.highScore}
                </p>
              </div>
            )}
          </div>

          {balanceError && (
            <div className="bg-red-950/80 backdrop-blur-md border-2 border-red-800 rounded-2xl px-8 py-5 max-w-md shadow-2xl animate-pulse">
              <div className="flex items-center gap-3">
                <div className="text-3xl">⚠️</div>
                <p className="text-red-200 font-bold text-lg">{balanceError}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-6 items-center">
            {!isConnected ? (
              <div className="flex flex-col items-center gap-4">
                <WalletConnectButton />
                <p className="text-zinc-400 text-sm text-center max-w-md">
                  Connect your Base wallet to play. You'll need $0.0001 USD in ETH.
                </p>
              </div>
            ) : (
              <StyledButton
                onClick={startGame}
                disabled={isCheckingBalance || gameStateRef.current.isTransactionPending}
                variant="primary"
                size="xl"
              >
                {gameStateRef.current.isTransactionPending
                  ? '⏳ Starting...'
                  : isCheckingBalance
                  ? '🔍 Checking...'
                  : '🎮 Start Game'}
              </StyledButton>
            )}

            <div className="bg-zinc-900/80 backdrop-blur-md border-2 border-zinc-700 rounded-2xl p-6 shadow-2xl max-w-md">
              <div className="text-zinc-300 text-sm text-center space-y-3">
                <p className="text-white font-bold text-base uppercase tracking-wider mb-3">
                  💡 How to Play
                </p>
                <div className="space-y-2 text-zinc-200">
                  <p className="font-medium">🎯 <span className="text-white">Hold left/right side of screen</span> to rotate orbs</p>
                  <p className="font-medium">⚠️ <span className="text-white">Avoid white squares</span> or game over!</p>
                  <p className="text-xs text-zinc-400 mt-3">(Desktop: Use Arrow Keys or A/D)</p>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-700">
                  <p className="text-xs text-zinc-400">
                    Entry fee: <span className="text-emerald-400 font-bold">${MINIMUM_USD_REQUIRED.toFixed(3)} USD</span>
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    in Base ETH per game
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {gameStatus === 'playing' && (
        <>
          <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
            <GameCanvas
              gameState={gameStateRef.current}
              pulseIntensity={pulseIntensity}
            />
          </div>
          
          <ControlsGuide />
          
          <HUD
            score={gameStateRef.current.score}
            highScore={gameStateRef.current.highScore}
            elapsedTime={elapsedTime}
            difficulty={gameStateRef.current.difficulty}
          />

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="fixed bottom-4 left-4 z-40 bg-zinc-900/95 backdrop-blur-sm border border-zinc-700 rounded-full p-3 shadow-lg hover:bg-zinc-800 transition-all"
            title={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            <span className="text-2xl">
              {audioEnabled ? '🔊' : '🔇'}
            </span>
          </button>

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
        <div className="flex flex-col items-center gap-8 z-10 px-4">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-900 blur-3xl opacity-40 animate-pulse" />
              <h2 className="relative text-6xl md:text-8xl font-black text-white tracking-wider drop-shadow-2xl">
                GAME OVER
              </h2>
            </div>
            
            <div className="bg-zinc-800/80 backdrop-blur-md border-2 border-zinc-600 rounded-2xl px-12 py-8 shadow-2xl mb-4">
              <p className="text-zinc-400 text-lg uppercase tracking-wider mb-2">Final Score</p>
              <p className="text-white text-6xl md:text-7xl font-black drop-shadow-2xl">
                {gameStateRef.current.score}
              </p>
            </div>
            
            <div className="bg-zinc-800/80 backdrop-blur-md border-2 border-zinc-600 rounded-2xl px-8 py-4 shadow-2xl">
              <p className="text-zinc-400 text-sm uppercase tracking-wider">Best Score</p>
              <p className="text-white text-3xl font-bold">
                {gameStateRef.current.highScore}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <StyledButton
              onClick={startGame}
              disabled={isCheckingBalance || gameStateRef.current.isTransactionPending}
              variant="primary"
              size="lg"
            >
              {gameStateRef.current.isTransactionPending
                ? '⏳ Starting...'
                : '🔄 Play Again'}
            </StyledButton>
            
            <StyledButton
              onClick={resetGame}
              variant="outline"
              size="lg"
            >
              🏠 Menu
            </StyledButton>
          </div>
        </div>
      )}

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-gradient-radial from-zinc-600/20 via-zinc-700/10 to-transparent"
          style={{
            opacity: pulseIntensity,
            transition: 'opacity 0.2s ease-out',
          }}
        />
      </div>
    </div>
  );
}
