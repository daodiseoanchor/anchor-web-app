import { TokenDisplayInfo } from '@libs/app-fns';
import { cw20, daodiseoswap, Token } from '@libs/types';
import { useWallet } from '@daodiseomoney/use-wallet';
import { useMemo } from 'react';
import { useTokenDisplayInfosQuery } from './tokenDisplayInfos';
import { useDaodiseoTokenInfo } from './tokenInfo';

interface DisplayInfo {
  tokenInfo: cw20.TokenInfoResponse<Token> | undefined;
  tokenDisplayInfo: TokenDisplayInfo | undefined;
}

export function useDaodiseoTokenDisplayInfo(
  assetInfo: daodiseoswap.AssetInfo,
  networkName?: string,
): DisplayInfo {
  const { network } = useWallet();

  const { data: tokenInfo } = useDaodiseoTokenInfo(assetInfo);
  const { data: tokenDisplayInfos } = useTokenDisplayInfosQuery(
    networkName ?? network.name,
  );

  return useMemo(() => {
    return {
      tokenInfo,
      tokenDisplayInfo: tokenDisplayInfos?.find(({ asset }) => {
        return JSON.stringify(asset) === JSON.stringify(assetInfo);
      }),
    };
  }, [assetInfo, tokenDisplayInfos, tokenInfo]);
}
