import { daodiseoTreasuryTaxCapQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { NativeDenom, Token, u } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(daodiseoTreasuryTaxCapQuery);

export function useDaodiseoTreasuryTaxCapQuery<T extends Token>(
  denom: NativeDenom,
): UseQueryResult<u<T>> {
  const { lcdQueryClient, queryErrorReporter } = useApp();

  const result = useQuery(
    [DAODISEO_QUERY_KEY.DAODISEO_TREASURY_TAX_CAP, denom, lcdQueryClient],
    queryFn as any,
    {
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result as UseQueryResult<u<T>>;
}
