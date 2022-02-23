import {
  AnchorTokenBalances,
  AncPrice,
  BAssetInfoAndBalancesTotal,
} from '@daodiseoanchor/app-fns';
import { AnchorContractAddress } from '@daodiseoanchor/app-provider';
import { moneyMarket, u, UST } from '@daodiseoanchor/types';
import { sum, vectorMultiply } from '@libs/big-math';
import { Big } from 'big.js';

export function computeHoldings(
  tokenBalances: AnchorTokenBalances,
  ancPrice: AncPrice | undefined,
  contractAddress: AnchorContractAddress,
  oraclePrices: moneyMarket.oracle.PricesResponse | undefined,
  bAssetBalanceTotal: BAssetInfoAndBalancesTotal | undefined,
) {
  if (!ancPrice || !oraclePrices) {
    return '0' as u<UST>;
  }

  const holdingsVector = [tokenBalances.uANC, tokenBalances.ubLuna];

  const bLunaPrice =
    oraclePrices.prices.find(
      ({ asset }) => asset === contractAddress.cw20.bLuna,
    )?.price ?? 0;

  const holdingsPriceVector = [ancPrice.ANCPrice, bLunaPrice];

  const holdingsUst = vectorMultiply(holdingsVector, holdingsPriceVector);

  const holdingsUstTotal = sum(...holdingsUst);

  return (
    bAssetBalanceTotal
      ? holdingsUstTotal.plus(bAssetBalanceTotal.totalUstValue)
      : holdingsUstTotal
  ) as u<UST<Big>>;
}
