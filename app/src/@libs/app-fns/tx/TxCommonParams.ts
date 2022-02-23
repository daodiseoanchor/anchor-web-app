import { QueryClient } from '@libs/query-client';
import { Gas, Rate, u, UST } from '@libs/types';
import { NetworkInfo, TxResult } from '@daodiseomoney/use-wallet';
import { CreateTxOptions } from '@daodiseomoney/daodiseo.js';

export interface TxCommonParams {
  // tx
  txFee: u<UST>;
  gasWanted: Gas;
  gasAdjustment: Rate<number>;
  fixedFee: u<UST<string | number>>;
  // network
  network: NetworkInfo;
  queryClient: QueryClient;
  post: (tx: CreateTxOptions) => Promise<TxResult>;
  // error handle
  txErrorReporter?: (error: unknown) => string;
}
