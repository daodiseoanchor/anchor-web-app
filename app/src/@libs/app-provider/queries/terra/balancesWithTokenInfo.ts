import {
  DaodiseoBalancesWithTokenInfo,
  daodiseoBalancesWithTokenInfoQuery,
} from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { HumanAddr, daodiseoswap } from '@libs/types';
import { useConnectedWallet } from '@daodiseomoney/use-wallet';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(daodiseoBalancesWithTokenInfoQuery);

export function useDaodiseoBalancesWithTokenInfoQuery(
  assets: daodiseoswap.AssetInfo[],
  walletAddress?: HumanAddr,
): UseQueryResult<DaodiseoBalancesWithTokenInfo | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const connectedWallet = useConnectedWallet();

  const result = useQuery(
    [
      DAODISEO_QUERY_KEY.DAODISEO_BALANCES_WITH_TOKEN_INFO,
      walletAddress ?? connectedWallet?.walletAddress,
      assets,
      queryClient,
    ],
    queryFn,
    {
      refetchInterval: !!connectedWallet && 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
