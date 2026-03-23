'use client'

import { useEffect, useState } from 'react';

export function useBaseAppWallet() {
  const [isBaseApp, setIsBaseApp] = useState<boolean>(false);
  const [autoConnect, setAutoConnect] = useState<boolean>(false);

  useEffect(() => {
    // Check if we're running in Base App environment
    const isInBaseApp = typeof window !== 'undefined' && (window as any).ethereum?.isBaseApp;
    setIsBaseApp(!!isInBaseApp);
    setAutoConnect(!!isInBaseApp);
  }, []);

  return { isBaseApp, autoConnect };
}
