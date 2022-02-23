import { HumanAddr } from '@libs/types';

export namespace lp {
  export interface Minter {
    minter: {};
  }

  export interface MinterResponse {
    /** daodiseoswap pair address */
    minter: HumanAddr;
  }
}
