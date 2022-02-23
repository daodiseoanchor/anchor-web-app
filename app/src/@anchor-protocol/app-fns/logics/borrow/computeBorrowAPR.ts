import type { Rate } from '@daodiseoanchor/types';
import { moneyMarket } from '@daodiseoanchor/types';
import big, { Big } from 'big.js';

export function computeBorrowAPR(
  borrowRate: moneyMarket.interestModel.BorrowRateResponse | undefined,
  blocksPerYear: number,
): Rate<Big> {
  return big(borrowRate?.rate ?? 0).mul(blocksPerYear) as Rate<Big>;
}
