import { CW20Addr, Token, u, UST } from '@daodiseoanchor/types';
import { AnchorBank } from '@daodiseoanchor/app-provider/hooks/useAnchorBank';
import { BigSource } from 'big.js';

export interface CurrencyInfo {
  label: string;
  value: string;
  integerPoints: number;
  decimalPoints: number;
  getWithdrawable: (bank: AnchorBank, fixedGas: u<UST<BigSource>>) => u<Token>;
  getFormatWithdrawable: (
    bank: AnchorBank,
    fixedGas: u<UST<BigSource>>,
  ) => Token;
  cw20Address?: CW20Addr;
}
