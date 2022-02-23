import { NativeDenom, Rate, Token, u, UST } from '@libs/types';
import { useDaodiseoTreasuryTaxCapQuery } from './treasuryTaxCap';
import { useDaodiseoTreasuryTaxRateQuery } from './treasuryTaxRate';

export function useTax<T extends Token>(
  denom: NativeDenom,
): { taxRate: Rate; maxTax: u<T> } {
  const { data: maxTax = '0' as u<T> } = useDaodiseoTreasuryTaxCapQuery<T>(denom);

  const { data: taxRate = '1' as Rate } = useDaodiseoTreasuryTaxRateQuery();

  return {
    maxTax,
    taxRate,
  };
}

export function useUstTax(): { taxRate: Rate; maxTax: u<UST> } {
  return useTax<UST>('uusd');
}
