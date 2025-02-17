import { ANCHOR_SAFE_RATIO } from '@daodiseoanchor/app-fns';
import type { u, UST } from '@daodiseoanchor/types';
import { max } from '@libs/big-math';
import { Big } from 'big.js';

export function computeBorrowSafeMax(
  borrowLimit: u<UST<Big>>,
  borrowedAmount: u<UST<Big>>,
): u<UST<Big>> {
  return max(0, borrowLimit.mul(ANCHOR_SAFE_RATIO).minus(borrowedAmount)) as u<
    UST<Big>
  >;
}
