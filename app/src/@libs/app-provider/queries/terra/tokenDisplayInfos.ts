import { TokenDisplayInfo, tokenDisplayInfosQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useWallet } from '@daodiseomoney/use-wallet';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { DAODISEO_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(tokenDisplayInfosQuery);

export function useTokenDisplayInfosQuery(
  networkName?: string,
): UseQueryResult<TokenDisplayInfo[]> {
  const { network } = useWallet();
  const { queryErrorReporter } = useApp();

  const result = useQuery(
    [DAODISEO_QUERY_KEY.DAODISEO_TOKEN_DISPLAY_INFOS, networkName ?? network.name],
    queryFn,
    {
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
