import { txTimeout } from '@libs/tx-helpers';
import { TxResult } from '@daodiseomoney/use-wallet';
import { CreateTxOptions } from '@daodiseomoney/daodiseo.js';
import { TxResultRendering, TxStreamPhase } from '../../models/tx';
import { TxHelper } from './TxHelper';

interface Params {
  helper: TxHelper;
  post: (tx: CreateTxOptions) => Promise<TxResult>;
}

export function _postTx({ helper, post }: Params) {
  return ({ value: tx }: TxResultRendering<CreateTxOptions>) => {
    helper.saveTx(tx);
    return Promise.race<TxResult>([post(tx), txTimeout<TxResult>()]).then(
      (txResult) => {
        helper.saveTxResult(txResult);
        return {
          value: txResult,

          phase: TxStreamPhase.BROADCAST,
          receipts: [helper.txHashReceipt()],
        } as TxResultRendering<TxResult>;
      },
    );
  };
}
