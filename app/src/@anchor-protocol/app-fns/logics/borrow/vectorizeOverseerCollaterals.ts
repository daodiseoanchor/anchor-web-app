import { bAsset, moneyMarket, u } from '@daodiseoanchor/types';
import { createCollateralVector } from '../../models/collaterals';

export const vectorizeOverseerCollaterals = createCollateralVector(
  (item: moneyMarket.overseer.CollateralsResponse['collaterals'][number]) => {
    return item;
  },
  '0' as u<bAsset>,
);
