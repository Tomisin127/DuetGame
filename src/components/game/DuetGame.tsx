'use client'
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect, useSwitchChain, useBalance, useSendCalls, useCallsStatus } from 'wagmi';
import { base } from 'wagmi/chains';
import { formatEther, parseEther, toHex, concat } from 'viem';
import { useWalletClient } from 'wagmi';
import type { GameState, GameStatus } from '@/types/game';
import { GAME_CONFIG, COLORS, DATA_SUFFIX } from '@/lib/game/constants';
import {
  checkCollision,
  spawnObstacle,
  updateObstacles,
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
import ControlsGuide from '@/components/game/ControlsGuide';
import WalletDisplay from '@/components/game/WalletDisplay';
import StyledButton from '@/components/game/StyledButton';
import WalletConnectButton from '@/components/WalletConnectButton';
import { useBaseAppWallet } from '@/hooks/useBaseAppWallet';

const MINIMUM_USD_REQUIRED = 0.0001;
const GAME_FEE_RECIPIENT = '0xEA549e458e77Fd93bf330e5EAEf730c50d8F5249';

export default function DuetGame() {
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
  const [isConfirmingTransaction, setIsConfirmingTransaction] = useState<boolean>(false);

  const { data: callsStatus, isLoading: isCheckingStatus } = useCallsStatus({
    id: pendingCallsId || undefined,
    query: {
      enabled: !!pendingCallsId,
      refetchInterval: pendingCallsId ? 1000 : undefined,
    },
  });

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
          `Insufficient funds. You need at least $${MINIMUM_USD_REQUIRED.toFixed(3)} (approx ${minimumEthRequired.toFixed(6)} ETH) to play.`
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

  const sendGameTransaction = async (): Promise<string | null> => {
    if (!address) {
      console.error('[v0] No address available for transaction');
      return null;
    }

    try {
      console.log('[v0] Starting transaction with builder code: bc_928el9vb');
      console.log('[v0] Address:', address);
      console.log('[v0] Current chain:', chain?.id, 'Base chain ID:', base.id);
      
      if (chain?.id !== base.id) {
        console.log('[v0] Switching to Base chain...');
        await switchChain?.({ chainId: base.id });
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const amountInEth = MINIMUM_USD_REQUIRED / ethPrice;
      const amountInWei = parseEther(amountInEth.toFixed(18));

      // Create transaction data with viem: "Duet" + builder code
      const duetData = toHex('Duet');
      const builderCodeData = toHex('bc_928el9vb');
      const combinedData = concat([duetData, builderCodeData]);

      console.log('[v0] Sending transaction with:');
      console.log('[v0] - Amount:', amountInWei.toString(), 'wei');
      console.log('[v0] - To:', GAME_FEE_RECIPIENT);
      console.log('[v0] - Combined Data:', combinedData);
      console.log('[v0] - Builder Code: bc_928el9vb');

      const callsId = await sendCalls({
        calls: [
          {
            to: GAME_FEE_RECIPIENT as `0x${string}`,
            value: amountInWei,
            data: combinedData,
          },
        ],
        capabilities: {
          dataSuffix: {
            value: DATA_SUFFIX,
            optional: false,
          },
        },
      });

      console.log('[v0] Transaction sent successfully with ID:', callsId);
      console.log('[v0] CallsId type:', typeof callsId, 'Value:', JSON.stringify(callsId));
      return callsId;
    } catch (error: unknown) {
      console.error('[v0] Transaction error:', error);
      console.error('[v0] Error type:', typeof error);
      console.error('[v0] Error keys:', error && typeof error === 'object' ? Object.keys(error) : 'N/A');

      if (error && typeof error === 'object' && 'message' in error) {
        const errorMessage = (error as { message: string }).message;
        console.error('[v0] Error message:', errorMessage);
        if (errorMessage.includes('rejected') || errorMessage.includes('denied') || errorMessage.includes('User rejected')) {
          setBalanceError('Transaction cancelled. Please sign the transaction to play.');
        } else {
          setBalanceError(`Transaction failed: ${errorMessage}`);
        }
      } else {
        setBalanceError('Transaction failed. Please try again.');
      }

      return null;
    }
  };

  const startGameAfterConfirmation = useCallback((): void => {
    console.log('[v0] startGameAfterConfirmation() called');
    console.log('[v0] Current gameStatus before change:', gameStatus);

    // Critical: Reset all transaction state FIRST
    setPendingCallsId(null);
    setIsConfirmingTransaction(false);
    setBalanceError('');

    // Update game state with fresh start
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

    console.log('[v0] Updated gameStateRef:', {
      isPlaying: gameStateRef.current.isPlaying,
      startTime: gameStateRef.current.startTime,
      now: now
    });

    // Enable audio
    setAudioEnabled(true);
    
    // Force immediate re-render
    forceUpdate((n) => n + 1);
    
    // Then update game status to trigger game loop
    setTimeout(() => {
      console.log('[v0] Setting gameStatus to playing');
      setGameStatus('playing');
      forceUpdate((n) => n + 1);
    }, 0);
    
    console.log('[v0] Game initialization complete - game should start now');
  }, []);

  useEffect(() => {
    if (!pendingCallsId) {
      console.log('[v0] No pending calls ID, skipping status check');
      return;
    }

    console.log('[v0] Checking calls status for:', pendingCallsId);
    console.log('[v0] Current callsStatus:', JSON.stringify(callsStatus, null, 2));
    console.log('[v0] callsStatus?.status:', callsStatus?.status);
    console.log('[v0] callsStatus?.receipts:', callsStatus?.receipts);
    console.log('[v0] isCheckingStatus:', isCheckingStatus);

    if (!callsStatus) {
      console.log('[v0] callsStatus not yet available, waiting...');
      return;
    }

    const status = callsStatus?.status ? callsStatus.status.toUpperCase() : '';
    console.log('[v0] Normalized status:', status);

    // Check for successful transaction completion
    const hasReceipts = callsStatus?.receipts && Array.isArray(callsStatus.receipts) && callsStatus.receipts.length > 0;
    const hasAnyValidReceipt = hasReceipts && callsStatus.receipts.some(r => r !== null && r !== undefined);
    
    // Success conditions: CONFIRMED, SUCCESS status, or has valid receipts
    const isConfirmed = 
      status === 'CONFIRMED' || 
      status === 'SUCCESS' ||
      status === 'COMPLETED' ||
      hasAnyValidReceipt;

    console.log('[v0] Debug check:');
    console.log('[v0] - status:', status);
    console.log('[v0] - hasReceipts:', hasReceipts);
    console.log('[v0] - hasAnyValidReceipt:', hasAnyValidReceipt);
    console.log('[v0] - isConfirmed:', isConfirmed);

    if (isConfirmed) {
      console.log('[v0] ✅ Transaction CONFIRMED! Starting game now...');
      startGameAfterConfirmation();
    } else if (status === 'FAILED' || status?.includes('FAILED') || status?.includes('ERROR') || status?.includes('REJECTED')) {
      console.log('[v0] ❌ Transaction FAILED with status:', status);
      setBalanceError('Transaction failed. Please try again.');
      setPendingCallsId(null);
      setIsConfirmingTransaction(false);
      gameStateRef.current.isTransactionPending = false;
      forceUpdate((n) => n + 1);
    } else {
      console.log('[v0] ⏳ Transaction pending with status:', status);
    }
  }, [callsStatus, pendingCallsId, startGameAfterConfirmation]);

  const startGame = async (): Promise<void> => {
    if (!isConnected) {
      setBalanceError('Please connect your wallet to play');
      return;
    }

    const hasBalance = await checkBalance();
    if (!hasBalance) return;

    gameStateRef.current.isTransactionPending = true;
    setBalanceError('Signing transaction in your wallet...');
    setIsConfirmingTransaction(false);
    forceUpdate((n) => n + 1);

    const callsId = await sendGameTransaction();

    if (!callsId) {
      gameStateRef.current.isTransactionPending = false;
      setIsConfirmingTransaction(false);
      forceUpdate((n) => n + 1);
      return;
    }

    setBalanceError('Confirming transaction on-chain...');
    setIsConfirmingTransaction(true);
    setPendingCallsId(callsId);
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

    const deltaTime = lastFrameTimeRef.current ? (timestamp - lastFrameTimeRef.current) / (1000 / 60) : 1;
    lastFrameTimeRef.current = timestamp;

    const currentTime = Date.now();
    const elapsed = currentTime - gameStateRef.current.startTime;
    setElapsedTime(elapsed);

    const newDifficulty = calculateDifficulty(elapsed);
    gameStateRef.current.difficulty = newDifficulty;
    gameStateRef.current.difficultyWave = Math.floor(newDifficulty / 5);

    const rotationSpeed = GAME_CONFIG.ROTATION_SPEED * deltaTime;

    // Apply slow-mo effect if active
    const effectiveDeltaTime = currentTime < gameStateRef.current.slowMoEndTime ? deltaTime * 0.5 : deltaTime;

    if (leftControlActive.current) {
      gameStateRef.current.circles[0].angle -= rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
      gameStateRef.current.circles[1].angle -= rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
      gameStateRef.current.circles[0].direction = 'ccw';
      gameStateRef.current.circles[1].direction = 'ccw';
    }

    if (rightControlActive.current) {
      gameStateRef.current.circles[0].angle += rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
      gameStateRef.current.circles[1].angle += rotationSpeed * (currentTime < gameStateRef.current.slowMoEndTime ? 0.5 : 1);
      gameStateRef.current.circles[0].direction = 'cw';
      gameStateRef.current.circles[1].direction = 'cw';
    }

    // Spawn power-ups
    const newPowerUp = spawnPowerUp(newDifficulty, GAME_CONFIG.CENTER_X, GAME_CONFIG.CENTER_Y);
    if (newPowerUp) {
      gameStateRef.current.powerUps.push(newPowerUp);
    }

    // Check power-up collisions
    const collectedPowerUp = checkPowerUpCollision(
      gameStateRef.current.circles,
      gameStateRef.current.powerUps,
      GAME_CONFIG.CENTER_X,
      GAME_CONFIG.CENTER_Y,
      GAME_CONFIG.ORBIT_RADIUS
    );

    if (collectedPowerUp) {
      // Create particles at collection
      gameStateRef.current.particles.push(
        ...createParticles(
          GAME_CONFIG.CENTER_X,
          GAME_CONFIG.CENTER_Y,
          collectedPowerUp.type === 'shield' ? '#FFD700' : collectedPowerUp.type === 'slowmo' ? '#00D9FF' : '#FF00FF',
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

    // Update power-ups
    gameStateRef.current.powerUps = updatePowerUps(gameStateRef.current.powerUps);

    // Update particles
    gameStateRef.current.particles = updateParticles(gameStateRef.current.particles);

    if (
      currentTime - gameStateRef.current.lastObstacleSpawn >
      GAME_CONFIG.OBSTACLE_SPAWN_INTERVAL - newDifficulty * 100
    ) {
      gameStateRef.current.obstacles.push(spawnObstacle(newDifficulty));
      gameStateRef.current.lastObstacleSpawn = currentTime;
    }

    gameStateRef.current.obstacles = gameStateRef.current.obstacles.map(obstacle => ({
      ...obstacle,
      y: obstacle.y + (GAME_CONFIG.BASE_OBSTACLE_SPEED + newDifficulty * GAME_CONFIG.DIFFICULTY_SPEED_MULTIPLIER) * effectiveDeltaTime,
    }));

    gameStateRef.current.obstacles = gameStateRef.current.obstacles.filter(
      (obstacle) => obstacle.y < GAME_CONFIG.CANVAS_HEIGHT
    );

    gameStateRef.current.score = Math.floor(elapsed / 100);

    // Update combo
    if (currentTime - gameStateRef.current.lastSuccessTime > 1000) {
      gameStateRef.current.comboCount = Math.max(0, gameStateRef.current.comboCount - 1);
      gameStateRef.current.lastSuccessTime = currentTime;
    }

    if (checkCollision(gameStateRef.current.circles, gameStateRef.current.obstacles)) {
      if (!gameStateRef.current.activeShield) {
        endGame();
        return;
      } else {
        // Shield absorbs hit, remove one obstacle
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
  }, [endGame]);

  useEffect(() => {
    console.log('[v0] gameStatus changed to:', gameStatus);
    console.log('[v0] gameStateRef.current.isPlaying:', gameStateRef.current.isPlaying);
    console.log('[v0] Rendering game with status:', gameStatus);

    if (gameStatus === 'playing' && gameStateRef.current.isPlaying) {
      console.log('[v0] ✅ Conditions met for game loop - gameStatus=playing AND isPlaying=true');
      lastFrameTimeRef.current = 0;
      
      // Start the game loop immediately with requestAnimationFrame
      const startLoop = () => {
        console.log('[v0] Game loop requestAnimationFrame started');
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      };
      
      // Use setTimeout to ensure React has finished rendering
      const timeoutId = setTimeout(startLoop, 0);

      return () => {
        clearTimeout(timeoutId);
        console.log('[v0] Cleaning up game loop effect');
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    } else {
      console.log('[v0] Game loop conditions not met - cancelling animation frame');
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
      const savedHighScore = localStorage.getItem('duet-highscore');
      if (savedHighScore) {
        gameStateRef.current.highScore = parseInt(savedHighScore, 10);
      }
    }
  }, []);

  useEffect(() => {
    const audio = new Audio('https://ia601905.us.archive.org/27/items/tvtunes_17714/28%20Days%20Later.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    let audioStarted = false;

    const startAudioOnInteraction = () => {
      if (audioRef.current && audioRef.current.paused && !audioStarted) {
        audioRef.current.play()
          .then(() => { audioStarted = true; })
          .catch(() => {});
      }
    };

    audio.play().catch(() => {});

    const events = ['click', 'touchstart', 'touchend', 'keydown', 'pointerdown'];
    events.forEach(event => document.addEventListener(event, startAudioOnInteraction, { capture: true }));

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      events.forEach(event => document.removeEventListener(event, startAudioOnInteraction, { capture: true }));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <AudioManager
        isPlaying={gameStatus === 'playing' && audioEnabled}
        onBeat={handleBeat}
      />

      {isConnected && gameStatus !== 'playing' && (
        <button
          onClick={() => disconnect()}
          className="fixed top-6 right-6 z-50 bg-black border border-white px-4 py-2 text-white text-xs font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-smooth"
          title="Disconnect Wallet"
        >
          Disconnect
        </button>
      )}

      {gameStatus === 'menu' && (
        <div className="flex flex-col items-center justify-center gap-12 z-10 px-4 min-h-screen">
          <div className="text-center animate-fade-in">
            <h1 className="text-8xl md:text-9xl font-light text-white tracking-tight mb-4">
              DUET
            </h1>
            <div className="h-px bg-white opacity-40 w-32 mx-auto mb-6" />
            <p className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-widest">
              On-Chain Survival Game
            </p>

            {gameStateRef.current.highScore > 0 && (
              <div className="mt-8 text-center border-t border-gray-800 pt-8">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-2">Personal Best</p>
                <p className="text-5xl md:text-6xl font-light text-white">
                  {gameStateRef.current.highScore}
                </p>
              </div>
            )}
          </div>

          {balanceError && (
            <div className="bg-red-900/30 backdrop-blur-md border border-red-700 px-6 py-4 max-w-md shadow-sm animate-fade-in">
              <p className="text-red-300 text-sm font-medium text-center">{balanceError}</p>
            </div>
          )}

          <div className="flex flex-col gap-8 items-center mt-8">
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
                disabled={isCheckingBalance || gameStateRef.current.isTransactionPending || isConfirmingTransaction}
                variant="primary"
                size="xl"
              >
                {isConfirmingTransaction
                  ? 'Confirming on-chain...'
                  : gameStateRef.current.isTransactionPending
                  ? 'Sign in wallet...'
                  : isCheckingBalance
                  ? 'Checking balance...'
                  : 'Start Game'}
              </StyledButton>
            )}

            <div className="max-w-md border border-gray-800 pt-8 mt-4">
              <div className="text-gray-400 text-xs text-center space-y-4">
                <div>
                  <p className="font-medium text-white mb-1 uppercase tracking-widest">Controls</p>
                  <p className="text-xs font-light">Hold left/right side of screen to rotate</p>
                </div>
                <div>
                  <p className="font-medium text-white mb-1 uppercase tracking-widest">Objective</p>
                  <p className="text-xs font-light">Avoid the white obstacles to advance</p>
                </div>
                <p className="text-xs text-gray-500 font-light pt-2">(Desktop: Arrow Keys or A/D)</p>
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
            combo={gameStateRef.current.comboCount}
            shield={gameStateRef.current.activeShield}
            slowMoActive={Date.now() < gameStateRef.current.slowMoEndTime}
          />

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="fixed bottom-6 left-6 z-40 bg-black border border-white px-4 py-3 text-white text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-smooth"
            title={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
          >
            {audioEnabled ? 'Sound On' : 'Sound Off'}
          </button>

          <MobileControls
            onLeftControl={(active) => { leftControlActive.current = active; }}
            onRightControl={(active) => { rightControlActive.current = active; }}
          />
        </>
      )}

      {gameStatus === 'gameOver' && (
        <div className="flex flex-col items-center justify-center gap-12 z-10 px-4">
          <div className="text-center animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-light text-white tracking-wider mb-2">
              GAME OVER
            </h2>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30 my-8" />

            <div className="mt-12">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-widest mb-3">Score</p>
              <p className="text-6xl md:text-7xl font-light text-white tabular-nums">
                {gameStateRef.current.score}
              </p>
            </div>

            {gameStateRef.current.highScore > gameStateRef.current.score && (
              <div className="mt-8 text-gray-400">
                <p className="text-xs font-medium uppercase tracking-widest mb-2">Best Score</p>
                <p className="text-2xl font-light text-gray-300">
                  {gameStateRef.current.highScore}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <StyledButton
              onClick={startGame}
              disabled={isCheckingBalance || gameStateRef.current.isTransactionPending || isConfirmingTransaction}
              variant="primary"
              size="lg"
            >
              {isConfirmingTransaction
                ? 'Confirming...'
                : gameStateRef.current.isTransactionPending
                ? 'Signing...'
                : 'Play Again'}
            </StyledButton>

            <StyledButton
              onClick={resetGame}
              variant="outline"
              size="lg"
            >
              Menu
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
}
