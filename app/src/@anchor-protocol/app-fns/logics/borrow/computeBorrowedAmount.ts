import type { u, UST } from '@daodiseoanchor/types';
import { moneyMarket } from '@daodiseoanchor/types';
import big, { Big } from 'big.js';

export function computeBorrowedAmount(
  borrowInfo: moneyMarket.market.BorrowerInfoResponse | undefined,
): u<UST<Big>> {
  return big(borrowInfo?.loan_amount ?? 0) as u<UST<Big>>;
}
