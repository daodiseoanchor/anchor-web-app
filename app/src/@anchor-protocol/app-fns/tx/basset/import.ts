import { exportCW20Decimals } from '@daodiseoanchor/app-fns/functions/cw20Decimals';
import {
  basset,
  bAsset,
  cw20,
  CW20Addr,
  Gas,
  HumanAddr,
  Rate,
  Token,
  u,
  UST,
} from '@daodiseoanchor/types';
import {
  pickAttributeValue,
  pickEvent,
  pickRawLog,
  TxResultRendering,
  TxStreamPhase,
} from '@libs/app-fns';
import {
  _catchTxError,
  _createTxOptions,
  _pollTxInfo,
  _postTx,
  createHookMsg,
  TxHelper,
} from '@libs/app-fns/tx/internal';
import { floor } from '@libs/big-math';
import { formatTokenInput, formatNumeric } from '@libs/formatter';
import { QueryClient } from '@libs/query-client';
import { pipe } from '@rx-stream/pipe';
import {
  CreateTxOptions,
  Fee,
  MsgExecuteContract,
} from '@daodiseomoney/daodiseo.js';
import { NetworkInfo, TxResult } from '@daodiseomoney/use-wallet';
import { Observable } from 'rxjs';

export function bAssetImportTx($: {
  walletAddr: HumanAddr;
  //bAssetInfo: BAssetInfo;
  converterAddr: HumanAddr;
  wormholeTokenAddr: CW20Addr;
  wormholeTokenAmount: bAsset;
  wormholeTokenInfo: cw20.TokenInfoResponse<Token>;
  gasFee: Gas;
  gasAdjustment: Rate<number>;
  fixedGas: u<UST>;
  network: NetworkInfo;
  queryClient: QueryClient;
  post: (tx: CreateTxOptions) => Promise<TxResult>;
  txErrorReporter?: (error: unknown) => string;
  onTxSucceed?: () => void;
}): Observable<TxResultRendering> {
  const helper = new TxHelper({ ...$, txFee: $.fixedGas });

  return pipe(
    _createTxOptions({
      msgs: [
        new MsgExecuteContract($.walletAddr, $.wormholeTokenAddr, {
          send: {
            contract: $.converterAddr,
            amount: exportCW20Decimals<bAsset>(
              formatTokenInput($.wormholeTokenAmount) as u<bAsset>,
              $.wormholeTokenInfo,
            ),
            msg: createHookMsg({
              convert_wormhole_to_anchor: {},
            } as basset.converter.ConvertWormholeToAnchor),
          },
        } as cw20.Send<bAsset>),
      ],
      fee: new Fee($.gasFee, floor($.fixedGas) + 'uusd'),
      gasAdjustment: $.gasAdjustment,
    }),
    _postTx({ helper, ...$ }),
    _pollTxInfo({ helper, ...$ }),
    ({ value: txInfo }) => {
      const rawLog = pickRawLog(txInfo, 0);

      if (!rawLog) {
        return helper.failedToFindRawLog();
      }

      const fromContract = pickEvent(rawLog, 'from_contract');

      if (!fromContract) {
        return helper.failedToFindEvents('from_contract');
      }

      // TODO: need to fix this to pull the asset symbols, names, and decimals
      // from the Daodiseo asset info

      try {
        const amount = pickAttributeValue<u<bAsset>>(fromContract, 4);
        const mintedAmount = pickAttributeValue<u<bAsset>>(fromContract, 8);

        //const exchangeRate = new Int(mintedAmount).div(new Int(amount));

        return {
          value: null,
          phase: TxStreamPhase.SUCCEED,
          receipts: [
            amount && {
              name: 'Provided amount',
              // value:
              //   formatBAsset(demicrofy(burnAmount)) +
              //   ` ${$.bAssetInfo.wormholeTokenInfo.symbol}`,
              value: formatNumeric(amount, 8) + ` webETH`,
            },
            mintedAmount && {
              name: 'Converted amount',
              // value:
              //   formatBAsset(demicrofy(returnAmount)) +
              //   ` ${$.bAssetInfo.bAsset.symbol}`,
              value: formatNumeric(mintedAmount) + ` bETH`,
            },
            {
              name: 'Exchange rate',
              value: `1 webETH per bETH`,
            },
            helper.txHashReceipt(),
            helper.txFeeReceipt(),
          ],
        } as TxResultRendering;
      } catch (error) {
        return helper.failedToParseTxResult();
      }
    },
  )().pipe(_catchTxError({ helper, ...$ }));
}
