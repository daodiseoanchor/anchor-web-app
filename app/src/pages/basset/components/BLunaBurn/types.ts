import { bLuna, Luna, u, UST } from '@daodiseoanchor/types';
import { ConnectedWallet } from '@daodiseomoney/use-wallet';

export interface BurnComponent {
  burnAmount: bLuna;
  getAmount: Luna;

  setBurnAmount: (nextBurnAmount: bLuna) => void;
  setGetAmount: (nextGetAmount: Luna) => void;

  connectedWallet: ConnectedWallet | undefined;
  fixedFee: u<UST>;

  setMode: (nextMode: 'burn' | 'swap') => void;
}
