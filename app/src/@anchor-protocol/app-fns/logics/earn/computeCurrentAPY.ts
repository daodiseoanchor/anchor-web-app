import type { Rate } from '@daodiseoanchor/types';
import { moneyMarket } from '@daodiseoanchor/types';
import big, { Big } from 'big.js';

export function computeCurrentAPY(
  overseerEpochState: moneyMarket.overseer.EpochStateResponse | undefined,
  blocksPerYear: number,
): Rate<Big> {
  return big(overseerEpochState?.deposit_rate ?? '0').mul(
    blocksPerYear,
  ) as Rate<Big>;
}
