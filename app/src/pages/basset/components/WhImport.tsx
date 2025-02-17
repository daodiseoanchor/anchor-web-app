import {
  BAssetInfo,
  prettifySymbol,
  validateTxFee,
} from '@daodiseoanchor/app-fns';
import {
  useAnchorBank,
  useBAssetImportTx,
} from '@daodiseoanchor/app-provider';
import {
  formatUST,
  LUNA_INPUT_MAXIMUM_DECIMAL_POINTS,
  LUNA_INPUT_MAXIMUM_INTEGER_POINTS,
} from '@daodiseoanchor/notation';
import { TokenIcon } from '@daodiseoanchor/token-icons';
import { bAsset } from '@daodiseoanchor/types';
import { useCW20Balance, useFixedFee } from '@libs/app-provider';
import { demicrofy, formatUInput, formatUToken } from '@libs/formatter';
import { ActionButton } from '@libs/neumorphism-ui/components/ActionButton';
import { NumberMuiInput } from '@libs/neumorphism-ui/components/NumberMuiInput';
import { Section } from '@libs/neumorphism-ui/components/Section';
import {
  SelectAndTextInputContainer,
  SelectAndTextInputContainerLabel,
} from '@libs/neumorphism-ui/components/SelectAndTextInputContainer';
import { StreamStatus } from '@rx-stream/react';
import { useConnectedWallet } from '@daodiseomoney/wallet-provider';
import big from 'big.js';
import { MessageBox } from 'components/MessageBox';
import { IconLineSeparator } from 'components/primitives/IconLineSeparator';
import { TxResultRenderer } from 'components/tx/TxResultRenderer';
import { SwapListItem, TxFeeList, TxFeeListItem } from 'components/TxFeeList';
import { ViewAddressWarning } from 'components/ViewAddressWarning';
import { fixHMR } from 'fix-hmr';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { symbolToTokenIcon } from '../symbolToTokenIcon';
import { ConvertSymbols, ConvertSymbolsContainer } from './ConvertSymbols';

export interface WhImportProps {
  className?: string;
  bAssetInfo: BAssetInfo;
}

function Component({ className, bAssetInfo }: WhImportProps) {
  // ---------------------------------------------
  // dependencies
  // ---------------------------------------------
  const connectedWallet = useConnectedWallet();

  const [convert, convertResult] = useBAssetImportTx(
    bAssetInfo.bAsset.collateral_token,
  );

  const fixedFee = useFixedFee();

  // ---------------------------------------------
  // states
  // ---------------------------------------------
  const [amount, setAmount] = useState<bAsset>('' as bAsset);

  // ---------------------------------------------
  // queries
  // ---------------------------------------------
  const bank = useAnchorBank();

  const balance = useCW20Balance<bAsset>(
    bAssetInfo.converterConfig.wormhole_token_address ?? undefined,
    connectedWallet?.walletAddress,
  );

  // ---------------------------------------------
  // logics
  // ---------------------------------------------
  const invalidTxFee = useMemo(
    () => !!connectedWallet && validateTxFee(bank.tokenBalances.uUST, fixedFee),
    [bank, fixedFee, connectedWallet],
  );

  const invalidAmount = useMemo(() => {
    return !!connectedWallet &&
      amount.length > 0 &&
      big(amount).gt(demicrofy(balance))
      ? 'Not enough assets'
      : undefined;
  }, [amount, balance, connectedWallet]);

  // ---------------------------------------------
  // callbacks
  // ---------------------------------------------
  const init = useCallback(() => {
    setAmount('' as bAsset);
  }, []);

  const proceed = useCallback(
    (amount: bAsset) => {
      if (!connectedWallet || !convert) {
        return;
      }

      convert({
        amount,
        onTxSucceed: () => {
          init();
        },
      });
    },
    [connectedWallet, convert, init],
  );

  // ---------------------------------------------
  // presentation
  // ---------------------------------------------
  const whSymbol = useMemo(() => {
    return prettifySymbol(
      bAssetInfo.wormholeTokenInfo!.symbol,
      bAssetInfo.wormholeTokenInfo,
    );
  }, [bAssetInfo.wormholeTokenInfo]);

  const bSymbol = useMemo(() => {
    return prettifySymbol(bAssetInfo.bAsset.symbol);
  }, [bAssetInfo.bAsset.symbol]);

  if (
    convertResult?.status === StreamStatus.IN_PROGRESS ||
    convertResult?.status === StreamStatus.DONE
  ) {
    return (
      <Section className={className}>
        <TxResultRenderer
          resultRendering={convertResult.value}
          onExit={() => {
            init();
            switch (convertResult.status) {
              case StreamStatus.IN_PROGRESS:
                convertResult.abort();
                break;
              case StreamStatus.DONE:
                convertResult.clear();
                break;
            }
          }}
        />
      </Section>
    );
  }

  return (
    <Section className={className}>
      {!!invalidTxFee && <MessageBox>{invalidTxFee}</MessageBox>}

      <ConvertSymbolsContainer>
        <ConvertSymbols
          className="symbols"
          view="import"
          fromIcon={<TokenIcon token={symbolToTokenIcon(whSymbol)} />}
          toIcon={<TokenIcon token={symbolToTokenIcon(bSymbol)} />}
        />
      </ConvertSymbolsContainer>

      <div className="from-description">
        <p>From</p>
        <p />
      </div>

      <SelectAndTextInputContainer
        className="from"
        gridColumns={[140, '1fr']}
        error={!!invalidAmount}
        leftHelperText={invalidAmount}
        rightHelperText={
          !!connectedWallet && (
            <span>
              Balance:{' '}
              <span
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onClick={() =>
                  big(balance).gt(0) &&
                  setAmount(formatUInput(balance) as bAsset)
                }
              >
                {formatUToken(balance)} {whSymbol}
              </span>
            </span>
          )
        }
      >
        <SelectAndTextInputContainerLabel>
          <TokenIcon token={symbolToTokenIcon(whSymbol)} /> {whSymbol}
        </SelectAndTextInputContainerLabel>
        <NumberMuiInput
          placeholder="0.00"
          value={amount}
          maxIntegerPoinsts={LUNA_INPUT_MAXIMUM_INTEGER_POINTS}
          maxDecimalPoints={LUNA_INPUT_MAXIMUM_DECIMAL_POINTS}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setAmount(target.value as bAsset)
          }
        />
      </SelectAndTextInputContainer>

      <IconLineSeparator />

      <div className="to-description">
        <p>To</p>
        <p />
      </div>

      <SelectAndTextInputContainer className="to" gridColumns={[140, '1fr']}>
        <SelectAndTextInputContainerLabel>
          <TokenIcon token={symbolToTokenIcon(bSymbol)} /> {bSymbol}
        </SelectAndTextInputContainerLabel>
        <NumberMuiInput
          placeholder="0.00"
          value={amount}
          maxIntegerPoinsts={LUNA_INPUT_MAXIMUM_INTEGER_POINTS}
          maxDecimalPoints={LUNA_INPUT_MAXIMUM_DECIMAL_POINTS}
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            setAmount(target.value as bAsset)
          }
        />
      </SelectAndTextInputContainer>

      {amount.length > 0 && (
        <TxFeeList className="receipt">
          <SwapListItem
            label="Price"
            currencyA={whSymbol}
            currencyB={bSymbol}
            exchangeRateAB={1}
            initialDirection="a/b"
            formatExchangeRate={() => '1'}
          />
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
            !convert ||
            amount.length === 0 ||
            big(amount).lte(0) ||
            !!invalidTxFee ||
            !!invalidAmount
          }
          onClick={() => proceed(amount)}
        >
          Convert
        </ActionButton>
      </ViewAddressWarning>
    </Section>
  );
}

const StyledComponent = styled(Component)`
  .from-description,
  .to-description {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 16px;
    color: ${({ theme }) => theme.dimTextColor};

    > :last-child {
      font-size: 12px;
    }

    margin-bottom: 12px;
  }

  .from,
  .to {
    margin-bottom: 30px;
    img {
      font-size: 12px;
    }
  }

  hr {
    margin: 40px 0;
  }

  .receipt {
    margin-bottom: 40px;
  }

  .submit {
    width: 100%;
    height: 60px;
  }
`;

export const WhImport = fixHMR(StyledComponent);
