import { DaodiseoBalances, daodiseoBalancesQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { HumanAddr, daodiseoswap } from '@libs/types';
import { useConnectedWallet } from '@daodiseomoney/use-wallet';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(daodiseoBalancesQuery);

export function useDaodiseoBalancesQuery(
  assets: daodiseoswap.AssetInfo[],
  walletAddress?: HumanAddr,
): UseQueryResult<DaodiseoBalances | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const connectedWallet = useConnectedWallet();

  const result = useQuery(
    [
      DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
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
