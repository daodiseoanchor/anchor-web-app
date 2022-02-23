import { daodiseoTreasuryTaxRateQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { Rate } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(daodiseoTreasuryTaxRateQuery);

export function useDaodiseoTreasuryTaxRateQuery(): UseQueryResult<Rate> {
  const { lcdQueryClient, queryErrorReporter } = useApp();

  const result = useQuery(
    [DAODISEO_QUERY_KEY.DAODISEO_TREASURY_TAX_RATE, lcdQueryClient],
    queryFn,
    {
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
