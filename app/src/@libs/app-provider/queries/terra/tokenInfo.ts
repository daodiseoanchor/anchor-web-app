import { daodiseoTokenInfoQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { cw20, daodiseoswap, Token } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(daodiseoTokenInfoQuery);

export function useDaodiseoTokenInfo<T extends Token>(
  asset: daodiseoswap.AssetInfo,
): UseQueryResult<cw20.TokenInfoResponse<T> | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const result = useQuery(
    [DAODISEO_QUERY_KEY.DAODISEO_TOKEN_INFO, asset, queryClient],
    queryFn as any,
    {
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result as any;
}
