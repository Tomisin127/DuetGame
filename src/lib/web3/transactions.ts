import { parseEther } from 'viem';
import type { UseSendCallsReturnType } from 'wagmi';
import { DATA_SUFFIX } from '@/lib/web3/provider';

export interface TransactionConfig {
  entryFeeUsd: number;
  ethPrice: number;
  recipientAddress: string;
}

export async function sendGameTransaction(
  sendCalls: UseSendCallsReturnType['sendCalls'],
  config: TransactionConfig,
  userAddress?: string
): Promise<string | null> {
  try {
    const { entryFeeUsd, ethPrice, recipientAddress } = config;
    const ethAmount = entryFeeUsd / ethPrice;
    const valueInWei = parseEther(ethAmount.toString());

    const result = await sendCalls({
      calls: [
        {
          to: recipientAddress as `0x${string}`,
          value: valueInWei,
        },
      ],
      capabilities: {
        dataSuffix: {
          value: DATA_SUFFIX,
          optional: true,
        },
      },
    });

    return result as string;
  } catch (error) {
    console.error('[v0] Transaction error:', error);
    return null;
  }
}

export function validateGameTransaction(
  balance: string | undefined,
  requiredUsd: number,
  ethPrice: number
): { isValid: boolean; message: string } {
  if (!balance) {
    return { isValid: false, message: 'Unable to fetch wallet balance' };
  }

  try {
    const balanceEth = parseFloat(balance);
    const requiredEth = requiredUsd / ethPrice;

    if (balanceEth < requiredEth) {
      return {
        isValid: false,
        message: `Insufficient balance. Need ${requiredEth.toFixed(6)} ETH`,
      };
    }

    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: 'Invalid balance format' };
  }
}

export function formatTransactionMessage(status: string | undefined): string {
  if (!status) return 'Processing...';

  const statusUpper = status.toUpperCase();

  if (statusUpper === 'CONFIRMED') {
    return 'Transaction confirmed! Starting game...';
  } else if (statusUpper === 'FAILED') {
    return 'Transaction failed. Please try again.';
  } else if (statusUpper === 'PENDING') {
    return 'Waiting for confirmation...';
  }

  return 'Confirming transaction...';
}
