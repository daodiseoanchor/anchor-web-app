import { BorrowAPYData, borrowAPYQuery } from '@daodiseoanchor/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useQuery, UseQueryResult } from 'react-query';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(borrowAPYQuery);

export function useBorrowAPYQuery(): UseQueryResult<BorrowAPYData | undefined> {
  const { queryErrorReporter, indexerApiEndpoint } = useAnchorWebapp();

  return useQuery([ANCHOR_QUERY_KEY.BORROW_APY, indexerApiEndpoint], queryFn, {
    refetchInterval: 1000 * 60 * 5,
    keepPreviousData: true,
    onError: queryErrorReporter,
  });
}
