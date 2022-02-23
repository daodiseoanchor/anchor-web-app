import { DaodiseoswapPair, daodiseoswapPairQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { daodiseoswap } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(daodiseoswapPairQuery);

export function useDaodiseoswapPairQuery(
  assetInfos: [daodiseoswap.AssetInfo, daodiseoswap.AssetInfo],
): UseQueryResult<DaodiseoswapPair | undefined> {
  const { queryClient, queryErrorReporter, contractAddress } = useApp();

  const result = useQuery(
    [
      DAODISEO_QUERY_KEY.DAODISEOSWAP_PAIR,
      contractAddress.daodiseoswap.factory,
      assetInfos,
      queryClient,
    ],
    queryFn,
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
