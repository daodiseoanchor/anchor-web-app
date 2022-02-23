import { ANC, AncUstLP, Rate, u, UST } from '@daodiseoanchor/types';

export interface AncUstLpSimulation<T> {
  poolPrice: u<UST<T>>;
  lpFromTx: AncUstLP<T>;
  shareOfPool: Rate<T>;
  txFee: u<UST<T>>;

  ancAmount?: ANC<T>;
  ustAmount?: UST<T>;
}
