import { DaodiseoswapPool, daodiseoswapPoolQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { HumanAddr, Token } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(daodiseoswapPoolQuery);

export function useDaodiseoswapPoolQuery<T extends Token>(
  daodiseoswapPairAddr: HumanAddr | undefined,
): UseQueryResult<DaodiseoswapPool<T> | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const result = useQuery(
    [DAODISEO_QUERY_KEY.DAODISEOSWAP_POOL, daodiseoswapPairAddr, queryClient],
    queryFn as any,
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result as UseQueryResult<DaodiseoswapPool<T> | undefined>;
}
