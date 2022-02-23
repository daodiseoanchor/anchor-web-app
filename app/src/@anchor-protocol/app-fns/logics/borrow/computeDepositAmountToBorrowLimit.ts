import { computeBorrowLimit } from '@daodiseoanchor/app-fns';
import type { bAsset, u, UST } from '@daodiseoanchor/types';
import { CW20Addr, moneyMarket } from '@daodiseoanchor/types';
import { Big, BigSource } from 'big.js';
import { BAssetLtvs } from '../../queries/borrow/market';

export const computeDepositAmountToBorrowLimit =
  (
    collateralToken: CW20Addr,
    overseerCollaterals: moneyMarket.overseer.CollateralsResponse,
    oraclePrices: moneyMarket.oracle.PricesResponse,
    bAssetLtvs: BAssetLtvs,
  ) =>
  (depositAmount: u<bAsset<BigSource>>): u<UST<Big>> => {
    return computeBorrowLimit(overseerCollaterals, oraclePrices, bAssetLtvs, [
      collateralToken,
      depositAmount,
    ]);
  };
