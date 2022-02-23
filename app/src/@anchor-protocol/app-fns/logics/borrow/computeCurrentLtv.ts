import type { Rate } from '@daodiseoanchor/types';
import { moneyMarket } from '@daodiseoanchor/types';
import big, { Big } from 'big.js';
import { computeCollateralsTotalUST } from './computeCollateralsTotalUST';

export function computeCurrentLtv(
  marketBorrowerInfo: moneyMarket.market.BorrowerInfoResponse,
  overseerCollaterals: moneyMarket.overseer.CollateralsResponse,
  oraclePrices: moneyMarket.oracle.PricesResponse,
): Rate<Big> | undefined {
  const collateralsVaue = computeCollateralsTotalUST(
    overseerCollaterals,
    oraclePrices,
  );

  try {
    return big(marketBorrowerInfo.loan_amount).div(
      collateralsVaue,
    ) as Rate<Big>;
  } catch {
    return undefined;
  }
}
