import {
  RewardsAnchorLpRewardsData,
  rewardsAnchorLpRewardsQuery,
} from '@daodiseoanchor/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useQuery, UseQueryResult } from 'react-query';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(rewardsAnchorLpRewardsQuery);

export function useRewardsAnchorLpRewardsQuery(): UseQueryResult<
  RewardsAnchorLpRewardsData | undefined
> {
  const { queryErrorReporter, indexerApiEndpoint } = useAnchorWebapp();

  const result = useQuery(
    [ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS, indexerApiEndpoint],
    queryFn,
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
