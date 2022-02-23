import { AnchorTax, AnchorTokenBalances } from '@daodiseoanchor/app-fns';
import {
  ANC,
  AncUstLP,
  aUST,
  bLuna,
  bLunaLunaLP,
} from '@daodiseoanchor/types';
import {
  useCW20Balance,
  useDaodiseoNativeBalances,
  useUstTax,
} from '@libs/app-provider';
import { useConnectedWallet } from '@daodiseomoney/use-wallet';
import { useMemo } from 'react';
import { useAnchorWebapp } from '../contexts/context';

export interface AnchorBank {
  tax: AnchorTax;
  tokenBalances: AnchorTokenBalances;
  refetchTax: () => void;
  refetchUserBalances: () => void;
}

export function useAnchorBank(): AnchorBank {
  const { contractAddress } = useAnchorWebapp();

  const connectedWallet = useConnectedWallet();

  const { taxRate, maxTax } = useUstTax();

  const { uUST, uLuna } = useDaodiseoNativeBalances(
    connectedWallet?.walletAddress,
  );

  const uANC = useCW20Balance<ANC>(
    contractAddress.cw20.ANC,
    connectedWallet?.walletAddress,
  );

  const uAncUstLP = useCW20Balance<AncUstLP>(
    contractAddress.cw20.AncUstLP,
    connectedWallet?.walletAddress,
  );

  const uaUST = useCW20Balance<aUST>(
    contractAddress.cw20.aUST,
    connectedWallet?.walletAddress,
  );

  const ubLuna = useCW20Balance<bLuna>(
    contractAddress.cw20.bLuna,
    connectedWallet?.walletAddress,
  );

  const ubLunaLunaLP = useCW20Balance<bLunaLunaLP>(
    contractAddress.cw20.bLunaLunaLP,
    connectedWallet?.walletAddress,
  );

  return useMemo(() => {
    return {
      tax: {
        taxRate,
        maxTaxUUSD: maxTax,
      },
      tokenBalances: {
        uUST,
        uANC,
        uAncUstLP,
        uaUST,
        ubLuna,
        ubLunaLunaLP,
        uLuna,
      },
      refetchTax: () => {},
      refetchUserBalances: () => {},
    };
  }, [
    maxTax,
    taxRate,
    uANC,
    uAncUstLP,
    uLuna,
    uUST,
    uaUST,
    ubLuna,
    ubLunaLunaLP,
  ]);
}
