import { BAssetLtvs, computeBorrowLimit } from '@daodiseoanchor/app-fns';
import type { bAsset, Rate, u } from '@daodiseoanchor/types';
import { CW20Addr, moneyMarket } from '@daodiseoanchor/types';
import big, { Big, BigSource } from 'big.js';

export const computeRedeemAmountToLtv =
  (
    collateralToken: CW20Addr,
    marketBorrowerInfo: moneyMarket.market.BorrowerInfoResponse,
    overseerCollaterals: moneyMarket.overseer.CollateralsResponse,
    oraclePrices: moneyMarket.oracle.PricesResponse,
    bAssetLtvs: BAssetLtvs,
  ) =>
  (redeemAmount: u<bAsset<BigSource>>): Rate<Big> => {
    const borrowLimit = computeBorrowLimit(
      overseerCollaterals,
      oraclePrices,
      bAssetLtvs,
      [collateralToken, big(redeemAmount).mul(-1) as u<bAsset<Big>>],
    );

    return (
      big(borrowLimit).eq(0)
        ? big(0)
        : big(marketBorrowerInfo.loan_amount).div(borrowLimit)
    ) as Rate<Big>;
  };
