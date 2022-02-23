import type { Rate, daodiseoswap, Token, u } from '@daodiseoanchor/types';

export interface SwapSimulation<Get extends Token, Burn extends Token>
  extends daodiseoswap.pair.SimulationResponse<Get> {
  beliefPrice: Rate;
  //maxSpread: Rate;
  minimumReceived: u<Get>;
  swapFee: u<Get>;

  getAmount?: u<Get>;
  burnAmount?: u<Burn>;
}
