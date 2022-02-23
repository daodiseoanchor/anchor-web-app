import {
  QueryClient,
  wasmFetch,
  WasmQuery,
  WasmQueryData,
} from '@libs/query-client';
import { HumanAddr, LP, daodiseoswap, Token, u, UST } from '@libs/types';
import big from 'big.js';

interface DaodiseoswapPoolWasmQuery<T extends Token> {
  daodiseoswapPool: WasmQuery<
    daodiseoswap.pair.Pool,
    daodiseoswap.pair.PoolResponse<T, UST>
  >;
}

export type DaodiseoswapPoolInfo<T extends Token> = {
  tokenPoolSize: u<T>;
  ustPoolSize: u<UST>;
  tokenPrice: UST;
  lpShare: u<LP>;
};

export type DaodiseoswapPool<T extends Token> = WasmQueryData<
  DaodiseoswapPoolWasmQuery<T>
> & {
  daodiseoswapPoolInfo: DaodiseoswapPoolInfo<T>;
};

export async function daodiseoswapPoolQuery<T extends Token>(
  ustPairAddr: HumanAddr,
  queryClient: QueryClient,
): Promise<DaodiseoswapPool<T>> {
  const { daodiseoswapPool } = await wasmFetch<DaodiseoswapPoolWasmQuery<T>>({
    ...queryClient,
    id: `daodiseoswap--pool=${ustPairAddr}`,
    wasmQuery: {
      daodiseoswapPool: {
        // pair contract address
        contractAddress: ustPairAddr,
        query: {
          pool: {},
        },
      },
    },
  });

  const ustIndex = daodiseoswapPool.assets.findIndex(
    (asset) =>
      'native_token' in asset.info && asset.info.native_token.denom === 'uusd',
  )!;
  const tokenIndex = ustIndex === 0 ? 1 : 0;

  const tokenAsset = daodiseoswapPool.assets[tokenIndex] as daodiseoswap.CW20Asset<T>;
  const ustAsset = daodiseoswapPool.assets[
    tokenIndex === 0 ? 1 : 0
  ] as daodiseoswap.NativeAsset<UST>;

  const tokenPoolSize = tokenAsset.amount;
  const ustPoolSize = ustAsset.amount;
  const tokenPrice = big(ustPoolSize)
    .div(+tokenPoolSize === 0 ? 1 : tokenPoolSize)
    .toFixed() as UST;
  const lpShare = daodiseoswapPool.total_share;

  return {
    daodiseoswapPool,
    daodiseoswapPoolInfo: {
      tokenPoolSize,
      ustPoolSize,
      tokenPrice,
      lpShare,
    },
  };
}
