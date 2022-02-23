import {
  QueryClient,
  wasmFetch,
  WasmQuery,
  WasmQueryData,
} from '@libs/query-client';
import { HumanAddr, daodiseoswap } from '@libs/types';

export interface DaodiseoswapPairWasmQuery {
  daodiseoswapPair: WasmQuery<
    daodiseoswap.factory.Pair,
    daodiseoswap.factory.PairResponse
  >;
}

export type DaodiseoswapPair = WasmQueryData<DaodiseoswapPairWasmQuery>;

export async function daodiseoswapPairQuery(
  daodiseoswapFactoryAddr: HumanAddr,
  assetInfos: [daodiseoswap.AssetInfo, daodiseoswap.AssetInfo],
  queryClient: QueryClient,
): Promise<DaodiseoswapPair> {
  const urlQuery = assetInfos
    .reduce((urlQueries, asset, i) => {
      if ('token' in asset) {
        urlQueries.push(`token_${i + 1}=${asset.token.contract_addr}`);
      } else if ('native_token' in asset) {
        urlQueries.push(`native_token_${i + 1}=${asset.native_token.denom}`);
      }
      return urlQueries;
    }, [] as string[])
    .join('&');

  return wasmFetch<DaodiseoswapPairWasmQuery>({
    ...queryClient,
    id: `daodiseoswap--pair&${urlQuery}`,
    wasmQuery: {
      daodiseoswapPair: {
        contractAddress: daodiseoswapFactoryAddr,
        query: {
          pair: {
            asset_infos: assetInfos,
          },
        },
      },
    },
  });
}
