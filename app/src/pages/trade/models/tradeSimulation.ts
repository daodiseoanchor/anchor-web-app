import { Rate, daodiseoswap, Token, u, UST } from '@daodiseoanchor/types';

export interface TradeSimulation<
  To extends Token,
  From extends Token,
  R extends Token = To,
> extends daodiseoswap.pair.SimulationResponse<To, R> {
  beliefPrice: Rate;
  minimumReceived: u<To>;
  swapFee: u<To>;

  txFee: u<UST>;

  toAmount?: u<To>;
  fromAmount?: u<From>;
}
