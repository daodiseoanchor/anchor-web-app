import { GasPrice, gasPriceQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useQuery, UseQueryResult } from 'react-query';
import { DAODISEO_QUERY_KEY } from '../env';

const queryFn = createQueryFn((gasPriceEndpoint: string) => {
  return gasPriceQuery(gasPriceEndpoint);
});

export function useGasPriceQuery(
  gasPriceEndpoint: string,
  queryErrorReporter: ((error: unknown) => void) | undefined,
): UseQueryResult<GasPrice | undefined> {
  const result = useQuery(
    [DAODISEO_QUERY_KEY.DAODISEO_GAS_PRICE, gasPriceEndpoint],
    queryFn,
    {
      onError: queryErrorReporter,
    },
  );

  return result;
}
