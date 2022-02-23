import { QueryClient } from '@libs/query-client';
import { cw20, CW20Addr, HumanAddr, daodiseoswap, Token, UST } from '@libs/types';
import { cw20TokenInfoQuery } from '../cw20/tokenInfo';
import { daodiseoswapPairQuery } from '../daodiseoswap/pair';
import { DaodiseoswapPoolInfo, daodiseoswapPoolQuery } from '../daodiseoswap/pool';

export type CW20PoolInfo<T extends Token> = {
  tokenAddr: CW20Addr;
  daodiseoswapPair: daodiseoswap.factory.PairResponse;
  daodiseoswapPool: daodiseoswap.pair.PoolResponse<T, UST>;
  daodiseoswapPoolInfo: DaodiseoswapPoolInfo<T>;
  tokenInfo: cw20.TokenInfoResponse<T>;
};

export async function cw20PoolInfoQuery<T extends Token>(
  tokenAddr: CW20Addr,
  daodiseoswapFactoryAddr: HumanAddr,
  queryClient: QueryClient,
): Promise<CW20PoolInfo<T>> {
  const { daodiseoswapPair } = await daodiseoswapPairQuery(
    daodiseoswapFactoryAddr,
    [
      {
        token: {
          contract_addr: tokenAddr,
        },
      },
      {
        native_token: {
          denom: 'uusd',
        },
      },
    ],
    queryClient,
  );

  const { tokenInfo } = await cw20TokenInfoQuery<T>(tokenAddr, queryClient);

  const { daodiseoswapPool, daodiseoswapPoolInfo } = await daodiseoswapPoolQuery<T>(
    daodiseoswapPair.contract_addr,
    queryClient,
  );

  return {
    tokenAddr,
    daodiseoswapPair,
    daodiseoswapPool,
    daodiseoswapPoolInfo,
    tokenInfo,
  };
}
