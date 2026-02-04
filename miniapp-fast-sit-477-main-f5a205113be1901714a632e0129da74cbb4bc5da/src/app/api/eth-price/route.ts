import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface CoinGeckoResponse {
  ethereum: {
    usd: number;
  };
}

export async function GET(): Promise<NextResponse> {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd',
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch ETH price');
    }

    const data: CoinGeckoResponse = await response.json();
    const ethPriceUSD: number = data.ethereum.usd;

    return NextResponse.json({ 
      ethPrice: ethPriceUSD,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error fetching ETH price:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch ETH price', ethPrice: 2500 },
      { status: 200 }
    );
  }
}
