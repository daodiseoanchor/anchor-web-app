import { ANC, AncUstLP, u, UST } from '@daodiseoanchor/types';

export interface AncPrice {
  ANCPoolSize: u<ANC<string>>;
  USTPoolSize: u<UST<string>>;
  LPShare: u<AncUstLP<string>>;
  ANCPrice: UST<string>;
}
