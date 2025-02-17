import {
  computeBorrowedAmount,
  computeBorrowLimit,
} from '@daodiseoanchor/app-fns';
import { moneyMarket, Rate } from '@daodiseoanchor/types';
import { u, UST } from '@libs/types';
import { FormReturn } from '@libs/use-form';
import big, { Big } from 'big.js';
import { computeBorrowAPR } from '../../logics/borrow/computeBorrowAPR';
import { computeLtv } from '../../logics/borrow/computeLtv';
import { computeEstimateLiquidationPrice } from '../../logics/borrow/computeEstimateLiquidationPrice';
import { computeLtvToRepayAmount } from '../../logics/borrow/computeLtvToRepayAmount';
import { computeMaxRepayingAmount } from '../../logics/borrow/computeMaxRepayingAmount';
import { computeRepayAmountToLtv } from '../../logics/borrow/computeRepayAmountToLtv';
import { computeRepayNextLtv } from '../../logics/borrow/computeRepayNextLtv';
import { computeRepaySendAmount } from '../../logics/borrow/computeRepaySendAmount';
import { computeRepayTotalOutstandingLoan } from '../../logics/borrow/computeRepayTotalOutstandingLoan';
import { computeRepayTxFee } from '../../logics/borrow/computeRepayTxFee';
import { validateRepayAmount } from '../../logics/borrow/validateRepayAmount';
import { validateTxFee } from '../../logics/common/validateTxFee';
import { BAssetLtv, BAssetLtvs } from '../../queries/borrow/market';

export interface BorrowRepayFormInput {
  repayAmount: UST;
}

export interface BorrowRepayFormDependency {
  fixedFee: u<UST>;
  userUSTBalance: u<UST>;
  marketBorrowerInfo: moneyMarket.market.BorrowerInfoResponse;
  overseerCollaterals: moneyMarket.overseer.CollateralsResponse;
  oraclePrices: moneyMarket.oracle.PricesResponse;
  borrowRate: moneyMarket.interestModel.BorrowRateResponse;
  marketState: moneyMarket.market.StateResponse;
  overseerWhitelist: moneyMarket.overseer.WhitelistResponse;
  bAssetLtvsAvg: BAssetLtv;
  bAssetLtvs: BAssetLtvs;
  blocksPerYear: number;
  blockHeight: number;
  taxRate: Rate;
  maxTaxUUSD: u<UST>;
  connected: boolean;
}

export interface BorrowRepayFormStates extends BorrowRepayFormInput {
  amountToLtv: (repayAmount: u<UST>) => Rate<Big>;
  ltvToAmount: (ltv: Rate<Big>) => u<UST<Big>>;
  ltvStepFunction: (draftLtv: Rate<Big>) => Rate<Big>;

  borrowLimit: u<UST<Big>>;
  currentLtv: Rate<Big> | undefined;
  apr: Rate<Big>;
  maxRepayingAmount: u<UST<Big>>;
  invalidTxFee: string | undefined;
  bAssetLtvsAvg: BAssetLtv;
  dangerLtv: Rate<Big>;

  nextLtv: Rate<Big> | undefined;
  txFee: u<UST<Big>> | undefined;
  estimatedLiquidationPrice: string | null;
  sendAmount: u<UST<Big>> | undefined;
  totalOutstandingLoan: u<UST<Big>> | undefined;

  invalidRepayAmount: string | undefined;

  availablePost: boolean;
}

export interface BorrowRepayFormAsyncStates {}

export const borrowRepayForm = ({
  fixedFee,
  userUSTBalance,
  marketBorrowerInfo,
  overseerCollaterals,
  oraclePrices,
  borrowRate,
  marketState,
  overseerWhitelist,
  blocksPerYear,
  blockHeight,
  taxRate,
  maxTaxUUSD,
  bAssetLtvsAvg,
  bAssetLtvs,
  connected,
}: BorrowRepayFormDependency) => {
  const borrowedAmount = computeBorrowedAmount(marketBorrowerInfo);

  const borrowLimit = computeBorrowLimit(
    overseerCollaterals,
    oraclePrices,
    bAssetLtvs,
  );

  const amountToLtv = computeRepayAmountToLtv(borrowLimit, borrowedAmount);

  const ltvToAmount = computeLtvToRepayAmount(borrowLimit, borrowedAmount);

  const currentLtv = computeLtv(borrowLimit, borrowedAmount);

  const apr = computeBorrowAPR(borrowRate, blocksPerYear);

  const maxRepayingAmount = computeMaxRepayingAmount(
    marketState,
    borrowRate,
    marketBorrowerInfo,
    blockHeight,
    userUSTBalance,
    fixedFee,
  );

  const invalidTxFee = connected
    ? validateTxFee(userUSTBalance, fixedFee)
    : undefined;

  const dangerLtv = big(bAssetLtvsAvg.max).minus(0.1) as Rate<Big>;

  const ltvStepFunction = (draftLtv: Rate<Big>): Rate<Big> => {
    try {
      const draftAmount = ltvToAmount(draftLtv);
      return amountToLtv(draftAmount);
    } catch {
      return draftLtv;
    }
  };

  return ({
    repayAmount,
  }: BorrowRepayFormInput): FormReturn<
    BorrowRepayFormStates,
    BorrowRepayFormAsyncStates
  > => {
    const nextLtv = computeRepayNextLtv(repayAmount, currentLtv, amountToLtv);

    const estimatedLiquidationPrice = nextLtv
      ? computeEstimateLiquidationPrice(
          nextLtv,
          overseerWhitelist,
          overseerCollaterals,
          oraclePrices,
        )
      : null;

    const txFee = computeRepayTxFee(
      repayAmount,
      { taxRate, maxTaxUUSD },
      fixedFee,
    );

    const totalOutstandingLoan = computeRepayTotalOutstandingLoan(
      repayAmount,
      marketBorrowerInfo,
    );

    const sendAmount = computeRepaySendAmount(repayAmount, txFee);

    const invalidRepayAmount = validateRepayAmount(repayAmount, userUSTBalance);

    const availablePost =
      connected &&
      repayAmount.length > 0 &&
      big(repayAmount).gt(0) &&
      !!txFee &&
      !invalidTxFee &&
      !invalidRepayAmount;

    return [
      {
        amountToLtv,
        ltvToAmount,
        ltvStepFunction,
        repayAmount,
        apr,
        invalidTxFee,
        nextLtv,
        txFee,
        estimatedLiquidationPrice,
        availablePost,
        maxRepayingAmount,
        sendAmount,
        invalidRepayAmount,
        totalOutstandingLoan,
        bAssetLtvsAvg,
        borrowLimit,
        currentLtv,
        dangerLtv,
      },
      undefined,
    ];
  };
};
