import {
  BAssetLtvs,
  computeBorrowedAmount,
  computeBorrowLimit,
  vectorizeOraclePrices,
} from '@daodiseoanchor/app-fns';
import type { bAsset, Rate, u } from '@daodiseoanchor/types';
import { CW20Addr, moneyMarket } from '@daodiseoanchor/types';
import { Big, BigSource } from 'big.js';

export const computeLtvToDepositAmount =
  (
    collateralToken: CW20Addr,
    marketBorrowerInfo: moneyMarket.market.BorrowerInfoResponse,
    overseerCollaterals: moneyMarket.overseer.CollateralsResponse,
    oraclePrices: moneyMarket.oracle.PricesResponse,
    bAssetLtvs: BAssetLtvs,
  ) =>
  (ltv: Rate<BigSource>): u<bAsset<Big>> => {
    const borrowLimit = computeBorrowLimit(
      overseerCollaterals,
      oraclePrices,
      bAssetLtvs,
    );

    const prices = vectorizeOraclePrices(
      [collateralToken],
      oraclePrices.prices,
    );

    const borrowedAmount = computeBorrowedAmount(marketBorrowerInfo);

    const increasedAmount = borrowedAmount.div(ltv).minus(borrowLimit);

    const maxLtv = bAssetLtvs.get(collateralToken)?.max ?? 0;

    return increasedAmount.div(Big(prices[0]).mul(maxLtv)) as u<bAsset<Big>>;
  };
