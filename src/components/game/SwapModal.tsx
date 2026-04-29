'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import { useAccount, useBalance, useSendCalls, useReadContract, useChainId, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import {
  createPublicClient,
  http,
  fallback,
  encodeFunctionData,
  parseUnits,
  formatUnits,
  type Address,
} from 'viem';
import { DATA_SUFFIX } from '@/lib/web3/provider';

// ─── Constants ──────────────────────────────────────────────────────────────

const DUET_TOKEN: Address = '0xc3b1c564a81c1e913d6d1488cb65cbee64995121';
const WETH: Address = '0x4200000000000000000000000000000000000006';
const QUOTER_V2: Address = '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a';
const SWAP_ROUTER_02: Address = '0x2626664c2603336E57B271c5C0b26F421741e481';

const POOL_FEES = [10000, 3000, 500, 100] as const; // 1%, 0.3%, 0.05%, 0.01%

const BASE_RPC_URLS = [
  'https://mainnet.base.org',
  'https://base.llamarpc.com',
  'https://1rpc.io/base',
  'https://base.drpc.org',
];

const publicClient = createPublicClient({
  chain: base,
  transport: fallback(BASE_RPC_URLS.map((url) => http(url, { timeout: 8_000 }))),
});

// ─── ABIs ───────────────────────────────────────────────────────────────────

const ERC20_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint8' }],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'string' }],
  },
] as const;

const QUOTER_V2_ABI = [
  {
    type: 'function',
    name: 'quoteExactInputSingle',
    stateMutability: 'nonpayable',
    inputs: [
      {
        type: 'tuple',
        name: 'params',
        components: [
          { name: 'tokenIn', type: 'address' },
          { name: 'tokenOut', type: 'address' },
          { name: 'amountIn', type: 'uint256' },
          { name: 'fee', type: 'uint24' },
          { name: 'sqrtPriceLimitX96', type: 'uint160' },
        ],
      },
    ],
    outputs: [
      { name: 'amountOut', type: 'uint256' },
      { name: 'sqrtPriceX96After', type: 'uint160' },
      { name: 'initializedTicksCrossed', type: 'uint32' },
      { name: 'gasEstimate', type: 'uint256' },
    ],
  },
] as const;

const SWAP_ROUTER_ABI = [
  {
    type: 'function',
    name: 'exactInputSingle',
    stateMutability: 'payable',
    inputs: [
      {
        type: 'tuple',
        name: 'params',
        components: [
          { name: 'tokenIn', type: 'address' },
          { name: 'tokenOut', type: 'address' },
          { name: 'fee', type: 'uint24' },
          { name: 'recipient', type: 'address' },
          { name: 'amountIn', type: 'uint256' },
          { name: 'amountOutMinimum', type: 'uint256' },
          { name: 'sqrtPriceLimitX96', type: 'uint160' },
        ],
      },
    ],
    outputs: [{ name: 'amountOut', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'multicall',
    stateMutability: 'payable',
    inputs: [
      { name: 'deadline', type: 'uint256' },
      { name: 'data', type: 'bytes[]' },
    ],
    outputs: [{ name: 'results', type: 'bytes[]' }],
  },
  {
    type: 'function',
    name: 'unwrapWETH9',
    stateMutability: 'payable',
    inputs: [
      { name: 'amountMinimum', type: 'uint256' },
      { name: 'recipient', type: 'address' },
    ],
    outputs: [],
  },
] as const;

// ─── Types ──────────────────────────────────────────────────────────────────

type Mode = 'buy' | 'sell'; // buy = ETH -> DUET ; sell = DUET -> ETH

interface QuoteResult {
  amountOut: bigint;
  fee: number;
}

interface SwapModalProps {
  open: boolean;
  onClose: () => void;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

async function getBestQuote(
  tokenIn: Address,
  tokenOut: Address,
  amountIn: bigint
): Promise<QuoteResult | null> {
  if (amountIn <= 0n) return null;

  const results = await Promise.allSettled(
    POOL_FEES.map(async (fee) => {
      const { result } = await publicClient.simulateContract({
        address: QUOTER_V2,
        abi: QUOTER_V2_ABI,
        functionName: 'quoteExactInputSingle',
        args: [
          {
            tokenIn,
            tokenOut,
            amountIn,
            fee,
            sqrtPriceLimitX96: 0n,
          },
        ],
      });
      const tuple = result as readonly [bigint, bigint, number, bigint];
      return { amountOut: tuple[0], fee };
    })
  );

  let best: QuoteResult | null = null;
  for (const r of results) {
    if (r.status === 'fulfilled' && r.value.amountOut > 0n) {
      if (!best || r.value.amountOut > best.amountOut) best = r.value;
    }
  }
  return best;
}

function formatNum(value: bigint, decimals: number, maxFrac = 6): string {
  const s = formatUnits(value, decimals);
  const [int, frac = ''] = s.split('.');
  if (!frac) return int;
  const trimmed = frac.slice(0, maxFrac).replace(/0+$/, '');
  return trimmed ? `${int}.${trimmed}` : int;
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function SwapModal({ open, onClose }: SwapModalProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { sendCallsAsync } = useSendCalls();

  const [mode, setMode] = useState<Mode>('buy');
  const [amountIn, setAmountIn] = useState<string>('');
  const [quote, setQuote] = useState<QuoteResult | null>(null);
  const [isQuoting, setIsQuoting] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [slippage] = useState<number>(5); // 5% slippage

  const tokenIn = mode === 'buy' ? WETH : DUET_TOKEN;
  const tokenOut = mode === 'buy' ? DUET_TOKEN : WETH;
  const decimalsIn = 18; // both WETH and DUET assumed 18; refined below
  const decimalsOut = 18;

  // ─── Balances ─────────────────────────────────────────────────────────────
  const { data: ethBal, refetch: refetchEth } = useBalance({
    address,
    chainId: base.id,
    query: { enabled: open && !!address },
  });

  const { data: duetBal, refetch: refetchDuet } = useReadContract({
    address: DUET_TOKEN,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: base.id,
    query: { enabled: open && !!address },
  });

  const { data: duetAllowance, refetch: refetchAllowance } = useReadContract({
    address: DUET_TOKEN,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, SWAP_ROUTER_02] : undefined,
    chainId: base.id,
    query: { enabled: open && !!address && mode === 'sell' },
  });

  // periodic refresh while open
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      refetchEth();
      refetchDuet();
      refetchAllowance();
    }, 10_000);
    return () => clearInterval(id);
  }, [open, refetchEth, refetchDuet, refetchAllowance]);

  // ─── Quote (debounced) ────────────────────────────────────────────────────
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setQuote(null);
    setErrorMsg('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!amountIn || Number(amountIn) <= 0) return;

    debounceRef.current = setTimeout(async () => {
      try {
        setIsQuoting(true);
        const amt = parseUnits(amountIn, decimalsIn);
        const q = await getBestQuote(tokenIn, tokenOut, amt);
        if (!q) {
          setErrorMsg('No route found');
          setQuote(null);
        } else {
          setQuote(q);
        }
      } catch (e) {
        console.error('[v0] Quote error:', e);
        setQuote(null);
      } finally {
        setIsQuoting(false);
      }
    }, 500);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [amountIn, tokenIn, tokenOut, decimalsIn]);

  // ─── Derived state ────────────────────────────────────────────────────────
  const balanceIn = mode === 'buy' ? ethBal?.value ?? 0n : (duetBal as bigint | undefined) ?? 0n;
  const balanceOut = mode === 'buy' ? (duetBal as bigint | undefined) ?? 0n : ethBal?.value ?? 0n;

  const amountInWei = useMemo(() => {
    if (!amountIn || Number(amountIn) <= 0) return 0n;
    try {
      return parseUnits(amountIn, decimalsIn);
    } catch {
      return 0n;
    }
  }, [amountIn, decimalsIn]);

  const insufficientBalance = amountInWei > 0n && amountInWei > balanceIn;

  const needsApproval =
    mode === 'sell' &&
    amountInWei > 0n &&
    ((duetAllowance as bigint | undefined) ?? 0n) < amountInWei;

  const minOut = useMemo(() => {
    if (!quote) return 0n;
    return (quote.amountOut * BigInt(100 - slippage)) / 100n;
  }, [quote, slippage]);

  // ─── Actions ──────────────────────────────────────────────────────────────
  const ensureBaseChain = async () => {
    if (chainId !== base.id) {
      try {
        await switchChain?.({ chainId: base.id });
      } catch (e) {
        console.warn('[v0] switch chain failed', e);
      }
    }
  };

  const handleMax = () => {
    if (mode === 'buy') {
      // reserve ~10% for gas
      const v = (balanceIn * 90n) / 100n;
      setAmountIn(formatUnits(v, decimalsIn));
    } else {
      setAmountIn(formatUnits(balanceIn, decimalsIn));
    }
  };

  const handleApprove = async () => {
    if (!address) return;
    try {
      setIsSwapping(true);
      setStatusMsg('Approve DUET in your wallet...');
      setErrorMsg('');
      await ensureBaseChain();

      const data = encodeFunctionData({
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [SWAP_ROUTER_02, parseUnits('1000000000', 18)], // 1B tokens
      });

      await sendCallsAsync({
        calls: [{ to: DUET_TOKEN, data }],
        capabilities: { dataSuffix: { value: DATA_SUFFIX, optional: true } },
      });

      setStatusMsg('Approval submitted. Waiting for confirmation...');
      // Give the chain a beat then refetch allowance
      setTimeout(() => {
        refetchAllowance();
        setStatusMsg('');
      }, 4000);
    } catch (e) {
      console.error('[v0] Approve error:', e);
      const msg = (e as Error)?.message || '';
      if (/reject|denied|cancel/i.test(msg)) setErrorMsg('Approval cancelled.');
      else setErrorMsg('Approval failed.');
      setStatusMsg('');
    } finally {
      setIsSwapping(false);
    }
  };

  const handleSwap = async () => {
    if (!address || !quote || amountInWei <= 0n) return;
    try {
      setIsSwapping(true);
      setStatusMsg('Confirm swap in your wallet...');
      setErrorMsg('');
      await ensureBaseChain();

      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 30);

      if (mode === 'buy') {
        // ETH -> DUET (ExactInputSingle wrapped in multicall)
        const exactInput = encodeFunctionData({
          abi: SWAP_ROUTER_ABI,
          functionName: 'exactInputSingle',
          args: [
            {
              tokenIn: WETH,
              tokenOut: DUET_TOKEN,
              fee: quote.fee,
              recipient: address,
              amountIn: amountInWei,
              amountOutMinimum: minOut,
              sqrtPriceLimitX96: 0n,
            },
          ],
        });
        const data = encodeFunctionData({
          abi: SWAP_ROUTER_ABI,
          functionName: 'multicall',
          args: [deadline, [exactInput]],
        });

        await sendCallsAsync({
          calls: [{ to: SWAP_ROUTER_02, value: amountInWei, data }],
          capabilities: { dataSuffix: { value: DATA_SUFFIX, optional: true } },
        });
      } else {
        // DUET -> ETH (swap to router, then unwrap WETH9)
        const exactInput = encodeFunctionData({
          abi: SWAP_ROUTER_ABI,
          functionName: 'exactInputSingle',
          args: [
            {
              tokenIn: DUET_TOKEN,
              tokenOut: WETH,
              fee: quote.fee,
              recipient: SWAP_ROUTER_02, // keep WETH at the router
              amountIn: amountInWei,
              amountOutMinimum: minOut,
              sqrtPriceLimitX96: 0n,
            },
          ],
        });
        const unwrap = encodeFunctionData({
          abi: SWAP_ROUTER_ABI,
          functionName: 'unwrapWETH9',
          args: [minOut, address],
        });
        const data = encodeFunctionData({
          abi: SWAP_ROUTER_ABI,
          functionName: 'multicall',
          args: [deadline, [exactInput, unwrap]],
        });

        await sendCallsAsync({
          calls: [{ to: SWAP_ROUTER_02, data }],
          capabilities: { dataSuffix: { value: DATA_SUFFIX, optional: true } },
        });
      }

      setStatusMsg('Swap submitted!');
      setAmountIn('');
      setQuote(null);
      setTimeout(() => {
        refetchEth();
        refetchDuet();
        refetchAllowance();
        setStatusMsg('');
      }, 4000);
    } catch (e) {
      console.error('[v0] Swap error:', e);
      const msg = (e as Error)?.message || '';
      if (/reject|denied|cancel/i.test(msg)) setErrorMsg('Swap cancelled.');
      else if (/insufficient/i.test(msg)) setErrorMsg('Insufficient funds for swap + gas.');
      else setErrorMsg('Swap failed. Try again.');
      setStatusMsg('');
    } finally {
      setIsSwapping(false);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────
  if (!open) return null;

  const symbolIn = mode === 'buy' ? 'ETH' : 'DUET';
  const symbolOut = mode === 'buy' ? 'DUET' : 'ETH';

  const outDisplay = quote ? formatNum(quote.amountOut, decimalsOut, 6) : '0.0';

  const primaryDisabled =
    !isConnected ||
    !amountIn ||
    Number(amountIn) <= 0 ||
    insufficientBalance ||
    !quote ||
    isQuoting ||
    isSwapping;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-black border border-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/30 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <h3 className="text-sm font-medium text-white uppercase tracking-widest">
              Swap DUET
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none transition-smooth"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-6 space-y-4">
          {/* Mode toggle */}
          <div className="grid grid-cols-2 border border-white/40">
            <button
              onClick={() => {
                setMode('buy');
                setAmountIn('');
                setQuote(null);
              }}
              className={`py-3 text-xs font-medium uppercase tracking-widest transition-smooth ${
                mode === 'buy'
                  ? 'bg-white text-black'
                  : 'bg-black text-gray-400 hover:text-white'
              }`}
            >
              Buy DUET
            </button>
            <button
              onClick={() => {
                setMode('sell');
                setAmountIn('');
                setQuote(null);
              }}
              className={`py-3 text-xs font-medium uppercase tracking-widest transition-smooth border-l border-white/40 ${
                mode === 'sell'
                  ? 'bg-white text-black'
                  : 'bg-black text-gray-400 hover:text-white'
              }`}
            >
              Sell DUET
            </button>
          </div>

          {/* From */}
          <div className="border border-white/30 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                You Pay
              </span>
              <button
                onClick={handleMax}
                disabled={!isConnected || balanceIn === 0n}
                className="text-[10px] font-medium text-white uppercase tracking-widest border border-white/40 px-2 py-0.5 hover:bg-white hover:text-black transition-smooth disabled:opacity-40"
              >
                Max
              </button>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.0"
                value={amountIn}
                onChange={(e) => {
                  const v = e.target.value.replace(/[^0-9.]/g, '');
                  setAmountIn(v);
                }}
                className="flex-1 bg-transparent text-white text-2xl font-light tabular-nums outline-none placeholder:text-gray-700"
              />
              <span className="text-sm font-medium text-white uppercase tracking-widest">
                {symbolIn}
              </span>
            </div>
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
              Balance: {formatNum(balanceIn, decimalsIn, 4)} {symbolIn}
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center">
            <div className="h-8 w-8 border border-white/40 flex items-center justify-center text-white text-sm">
              ↓
            </div>
          </div>

          {/* To */}
          <div className="border border-white/30 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                You Receive
              </span>
              <span className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
                Slippage {slippage}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 text-2xl font-light tabular-nums text-white truncate">
                {isQuoting ? (
                  <span className="text-gray-500 text-sm tracking-widest uppercase">Quoting...</span>
                ) : (
                  outDisplay
                )}
              </div>
              <span className="text-sm font-medium text-white uppercase tracking-widest">
                {symbolOut}
              </span>
            </div>
            <div className="text-[10px] font-medium text-gray-500 uppercase tracking-widest">
              Balance: {formatNum(balanceOut, decimalsOut, 4)} {symbolOut}
            </div>
          </div>

          {/* Status / Error */}
          {(statusMsg || errorMsg || insufficientBalance) && (
            <div
              className={`border px-4 py-3 ${
                errorMsg || insufficientBalance
                  ? 'border-red-700 bg-red-900/20'
                  : 'border-white/40 bg-white/5'
              }`}
            >
              <p
                className={`text-[11px] font-medium uppercase tracking-widest text-center ${
                  errorMsg || insufficientBalance ? 'text-red-300' : 'text-white'
                }`}
              >
                {insufficientBalance ? `Insufficient ${symbolIn}` : errorMsg || statusMsg}
              </p>
            </div>
          )}

          {/* Action */}
          {!isConnected ? (
            <div className="border border-white/40 px-4 py-3">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest text-center">
                Connect wallet to swap
              </p>
            </div>
          ) : needsApproval ? (
            <button
              onClick={handleApprove}
              disabled={isSwapping || insufficientBalance}
              className="w-full bg-white text-black hover:bg-gray-200 active:bg-gray-300 border border-white py-4 text-sm font-medium uppercase tracking-widest transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSwapping ? 'Approving...' : `Approve DUET`}
            </button>
          ) : (
            <button
              onClick={handleSwap}
              disabled={primaryDisabled}
              className="w-full bg-white text-black hover:bg-gray-200 active:bg-gray-300 border border-white py-4 text-sm font-medium uppercase tracking-widest transition-smooth disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isSwapping
                ? 'Swapping...'
                : isQuoting
                ? 'Loading...'
                : `Swap ${symbolIn} → ${symbolOut}`}
            </button>
          )}

          {/* Footer */}
          <div className="border-t border-white/20 pt-3">
            <p className="text-[9px] font-light text-gray-600 uppercase tracking-widest text-center">
              Uniswap V3 · Base · {DUET_TOKEN.slice(0, 6)}…{DUET_TOKEN.slice(-4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
