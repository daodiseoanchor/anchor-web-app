import type { Luna } from '@daodiseoanchor/types';
import { AnchorBank } from '@daodiseoanchor/app-provider/hooks/useAnchorBank';
import { microfy } from '@libs/formatter';
import { ReactNode } from 'react';

export function validateBondAmount(
  bondAmount: Luna,
  bank: AnchorBank,
): ReactNode {
  if (bondAmount.length === 0) {
    return undefined;
  } else if (microfy(bondAmount).gt(bank.tokenBalances.uLuna ?? 0)) {
    return `Not enough assets`;
  }
  return undefined;
}
