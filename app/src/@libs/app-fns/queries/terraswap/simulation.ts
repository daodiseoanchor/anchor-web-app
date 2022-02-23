import {
  QueryClient,
  wasmFetch,
  WasmQuery,
  WasmQueryData,
} from '@libs/query-client';
import { HumanAddr, daodiseoswap, Token } from '@libs/types';

export interface DaodiseoswapSimulationWasmQuery {
  simulation: WasmQuery<
    daodiseoswap.pair.Simulation<Token>,
    daodiseoswap.pair.SimulationResponse<Token>
  >;
}

export type DaodiseoswapSimulation = WasmQueryData<DaodiseoswapSimulationWasmQuery>;

export async function daodiseoswapSimulationQuery(
  ustPairAddr: HumanAddr,
  offerAssetQuery: daodiseoswap.pair.Simulation<Token>['simulation']['offer_asset'],
  queryClient: QueryClient,
): Promise<DaodiseoswapSimulation> {
  const data = await wasmFetch<DaodiseoswapSimulationWasmQuery>({
    ...queryClient,
    wasmQuery: {
      simulation: {
        contractAddress: ustPairAddr,
        query: {
          simulation: {
            offer_asset: offerAssetQuery,
          },
        },
      },
    },
  });

  return data;
}
