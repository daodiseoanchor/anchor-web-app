import { ExecuteMsg } from '@anchor-protocol/anchor.js';
import { floor } from '@anchor-protocol/big-math';
import { NumberInput } from '@anchor-protocol/neumorphism-ui/components/NumberInput';
import { formatExecuteMsgNumber } from '@anchor-protocol/notation';
import { Rate } from '@anchor-protocol/types';
import { UpdateConfig as MarketUpdateConfig } from '@anchor-protocol/types/contracts/moneyMarket/market/updateConfig';
import { UpdateConfig as OverseerUpdateConfig } from '@anchor-protocol/types/contracts/moneyMarket/overseer/updateConfig';
import { InputAdornment } from '@material-ui/core';
import big from 'big.js';
import { useConstants } from 'contexts/contants';
import { useContractAddress } from 'contexts/contract';
import { PollCreateBase } from 'pages/gov/components/PollCreateBase';
import React, { ChangeEvent, useCallback, useState } from 'react';

export function PollCreateModifyMarketParameters() {
  // ---------------------------------------------
  // dependencies
  // ---------------------------------------------
  const address = useContractAddress();
  const { blocksPerYear } = useConstants();

  // ---------------------------------------------
  // states
  // ---------------------------------------------
  const [targetDepositRate, setTargetDepositRate] = useState<string>('');
  const [thresholdDepositRate, setThresholdDepositRate] = useState<string>('');
  const [
    bufferDistributionFactor,
    setBufferDistributionFactor,
  ] = useState<string>('');
  const [maxBorrowFactor, setMaxBorrowFactor] = useState<string>('');
  const [validPriceTimeframe, setValidPriceTimeframe] = useState<string>('');

  // ---------------------------------------------
  // callbacks
  // ---------------------------------------------
  const createMsgs = useCallback(
    (
      targetDepositRate: string,
      thresholdDepositRate: string,
      bufferDistributionFactor: string,
      maxBorrowFactor: string,
      validPriceTimeframe: string,
    ): ExecuteMsg[] => {
      const overseerUpdateConfig: OverseerUpdateConfig['update_config'] = {};
      const marketUpdateConfig: MarketUpdateConfig['update_config'] = {};

      if (targetDepositRate.length > 0) {
        overseerUpdateConfig['target_deposit_rate'] = formatExecuteMsgNumber(
          big(targetDepositRate).div(100).div(blocksPerYear),
        ) as Rate;
      }

      if (thresholdDepositRate.length > 0) {
        overseerUpdateConfig['threshold_deposit_rate'] = formatExecuteMsgNumber(
          big(thresholdDepositRate).div(100).div(blocksPerYear),
        ) as Rate;
      }

      if (bufferDistributionFactor.length > 0) {
        overseerUpdateConfig[
          'buffer_distribution_factor'
        ] = formatExecuteMsgNumber(
          big(bufferDistributionFactor).div(100),
        ) as Rate;
      }

      if (validPriceTimeframe.length > 0) {
        overseerUpdateConfig['price_timeframe'] = floor(
          big(validPriceTimeframe),
        ).toNumber();
      }

      if (maxBorrowFactor.length > 0) {
        marketUpdateConfig['max_borrow_factor'] = big(maxBorrowFactor)
          .div(100)
          .toFixed() as Rate;
      }

      const msgs: Omit<ExecuteMsg, 'order'>[] = [];

      if (Object.keys(overseerUpdateConfig).length > 0) {
        msgs.push({
          contract: address.moneyMarket.overseer,
          msg: Buffer.from(
            JSON.stringify({
              update_config: overseerUpdateConfig,
            }),
          ).toString('base64'),
        });
      }

      if (Object.keys(marketUpdateConfig).length > 0) {
        msgs.push({
          contract: address.moneyMarket.market,
          msg: Buffer.from(
            JSON.stringify({
              update_config: marketUpdateConfig,
            }),
          ).toString('base64'),
        });
      }

      return msgs.map((msg, i) => ({
        order: i + 1,
        ...msg,
      }));
    },
    [address.moneyMarket.market, address.moneyMarket.overseer, blocksPerYear],
  );

  // ---------------------------------------------
  // presentation
  // ---------------------------------------------
  return (
    <PollCreateBase
      pollTitle="Modify Market Parameters"
      submitDisabled={
        targetDepositRate.length === 0 &&
        thresholdDepositRate.length === 0 &&
        bufferDistributionFactor.length === 0 &&
        maxBorrowFactor.length === 0 &&
        validPriceTimeframe.length === 0
      }
      onCreateMsgs={() =>
        createMsgs(
          targetDepositRate,
          thresholdDepositRate,
          bufferDistributionFactor,
          maxBorrowFactor,
          validPriceTimeframe,
        )
      }
    >
      <div className="description">
        <p>Target Deposit Rate</p>
        <p />
      </div>

      <NumberInput
        placeholder="0"
        type="integer"
        maxIntegerPoinsts={2}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        value={targetDepositRate}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setTargetDepositRate(target.value)
        }
      />

      <div className="description">
        <p>Threshold Deposit Rate</p>
        <p />
      </div>

      <NumberInput
        placeholder="0"
        type="integer"
        maxIntegerPoinsts={2}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        value={thresholdDepositRate}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setThresholdDepositRate(target.value)
        }
      />

      <div className="description">
        <p>Buffer Distribution Factor</p>
        <p />
      </div>

      <NumberInput
        placeholder="0"
        type="integer"
        maxIntegerPoinsts={2}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        value={bufferDistributionFactor}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setBufferDistributionFactor(target.value)
        }
      />

      <div className="description">
        <p>Max Borrow Factor</p>
        <p />
      </div>

      <NumberInput
        placeholder="0"
        type="integer"
        maxIntegerPoinsts={2}
        InputProps={{
          endAdornment: <InputAdornment position="end">%</InputAdornment>,
        }}
        value={maxBorrowFactor}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setMaxBorrowFactor(target.value)
        }
      />

      <div className="description">
        <p>Valid Price Timeframe</p>
        <p />
      </div>

      <NumberInput
        placeholder="0"
        type="integer"
        maxIntegerPoinsts={3}
        InputProps={{
          endAdornment: <InputAdornment position="end">Seconds</InputAdornment>,
        }}
        value={validPriceTimeframe}
        onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
          setValidPriceTimeframe(target.value)
        }
      />
    </PollCreateBase>
  );
}
