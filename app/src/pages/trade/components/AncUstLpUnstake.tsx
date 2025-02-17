import { validateTxFee } from '@daodiseoanchor/app-fns';
import {
  useAncAncUstLpUnstakeTx,
  useAnchorWebapp,
} from '@daodiseoanchor/app-provider';
import { useAnchorBank } from '@daodiseoanchor/app-provider/hooks/useAnchorBank';
import {
  ANC_INPUT_MAXIMUM_DECIMAL_POINTS,
  ANC_INPUT_MAXIMUM_INTEGER_POINTS,
  formatLP,
  formatLPInput,
  formatUST,
} from '@daodiseoanchor/notation';
import { AncUstLP } from '@daodiseoanchor/types';
import { useAstroportDepositQuery, useFixedFee } from '@libs/app-provider';
import { demicrofy, microfy } from '@libs/formatter';
import { ActionButton } from '@libs/neumorphism-ui/components/ActionButton';
import { NumberInput } from '@libs/neumorphism-ui/components/NumberInput';
import { InputAdornment } from '@material-ui/core';
import { StreamStatus } from '@rx-stream/react';
import { useConnectedWallet } from '@daodiseomoney/wallet-provider';
import big from 'big.js';
import { MessageBox } from 'components/MessageBox';
import { TxResultRenderer } from 'components/tx/TxResultRenderer';
import { TxFeeList, TxFeeListItem } from 'components/TxFeeList';
import { ViewAddressWarning } from 'components/ViewAddressWarning';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';

export function AncUstLpUnstake() {
  // ---------------------------------------------
  // dependencies
  // ---------------------------------------------
  const connectedWallet = useConnectedWallet();

  const fixedFee = useFixedFee();

  const { contractAddress } = useAnchorWebapp();

  const [unstake, unstakeResult] = useAncAncUstLpUnstakeTx();

  // ---------------------------------------------
  // states
  // ---------------------------------------------
  const [lpAmount, setLpAmount] = useState<AncUstLP>('' as AncUstLP);

  // ---------------------------------------------
  // queries
  // ---------------------------------------------
  const bank = useAnchorBank();

  const { data: { deposit } = {} } = useAstroportDepositQuery<AncUstLP>(
    contractAddress.cw20.AncUstLP,
  );

  // ---------------------------------------------
  // logics
  // ---------------------------------------------
  const invalidTxFee = useMemo(
    () => !!connectedWallet && validateTxFee(bank.tokenBalances.uUST, fixedFee),
    [bank, fixedFee, connectedWallet],
  );

  const invalidLpAmount = useMemo(() => {
    if (lpAmount.length === 0 || !deposit) return undefined;

    return big(microfy(lpAmount)).gt(deposit) ? 'Not enough assets' : undefined;
  }, [deposit, lpAmount]);

  const init = useCallback(() => {
    setLpAmount('' as AncUstLP);
  }, []);

  const proceed = useCallback(
    (lpAmount: AncUstLP) => {
      if (!connectedWallet || !unstake) {
        return;
      }

      unstake({
        lpAmount,
        onTxSucceed: () => {
          init();
        },
      });
    },
    [connectedWallet, init, unstake],
  );

  // ---------------------------------------------
  // presentation
  // ---------------------------------------------
  if (
    unstakeResult?.status === StreamStatus.IN_PROGRESS ||
    unstakeResult?.status === StreamStatus.DONE
  ) {
    return (
      <TxResultRenderer
        resultRendering={unstakeResult.value}
        onExit={() => {
          init();

          switch (unstakeResult.status) {
            case StreamStatus.IN_PROGRESS:
              unstakeResult.abort();
              break;
            case StreamStatus.DONE:
              unstakeResult.clear();
              break;
          }
        }}
      />
    );
  }

  return (
    <>
      {!!invalidTxFee && <MessageBox>{invalidTxFee}</MessageBox>}

      <NumberInput
        className="amount"
        value={lpAmount}
        maxIntegerPoinsts={ANC_INPUT_MAXIMUM_INTEGER_POINTS}
        maxDecimalPoints={ANC_INPUT_MAXIMUM_DECIMAL_POINTS}
        error={!!invalidLpAmount}
        placeholder="0.00"
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setLpAmount(target.value as AncUstLP)
        }
        InputProps={{
          endAdornment: <InputAdornment position="end">LP</InputAdornment>,
        }}
      />

      <div className="wallet" aria-invalid={!!invalidLpAmount}>
        <span>{invalidLpAmount}</span>
        <span>
          Balance:{' '}
          <span
            style={{
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() =>
              deposit && setLpAmount(formatLPInput(demicrofy(deposit)))
            }
          >
            {deposit ? formatLP(demicrofy(deposit)) : 0} LP
          </span>
        </span>
      </div>

      {lpAmount.length > 0 && (
        <TxFeeList className="receipt">
          <TxFeeListItem label="Tx Fee">
            {formatUST(demicrofy(fixedFee))} UST
          </TxFeeListItem>
        </TxFeeList>
      )}

      {/* Submit */}
      <ViewAddressWarning>
        <ActionButton
          className="submit"
          disabled={
            !connectedWallet ||
            !connectedWallet.availablePost ||
            !unstake ||
            lpAmount.length === 0 ||
            big(lpAmount).lte(0) ||
            !!invalidTxFee ||
            !!invalidLpAmount
          }
          onClick={() => proceed(lpAmount)}
        >
          Unstake
        </ActionButton>
      </ViewAddressWarning>
    </>
  );
}
