import {
  prettifySymbol,
  vectorizeOraclePrices,
  vectorizeOverseerCollaterals,
} from '@daodiseoanchor/app-fns';
import {
  useBorrowBorrowerQuery,
  useBorrowMarketQuery,
} from '@daodiseoanchor/app-provider';
import { bAsset, Rate, u, UST } from '@daodiseoanchor/types';
import { sum, vectorMultiply } from '@libs/big-math';
import { useConnectedWallet } from '@daodiseomoney/wallet-provider';
import big, { Big } from 'big.js';
import { useBorrowOverviewData } from 'pages/borrow/logics/useBorrowOverviewData';
import { BorrowedValue } from 'pages/mypage/components/BorrowedValue';
import { EmptySection } from 'pages/mypage/components/EmptySection';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { CollateralItem, TotalCollateralValue } from './TotalCollateralValue';

export function Borrow() {
  const connectedWallet = useConnectedWallet();

  const { data: { oraclePrices, overseerWhitelist } = {} } =
    useBorrowMarketQuery();

  const { data: { overseerCollaterals } = {} } = useBorrowBorrowerQuery();

  const {
    borrowedValue,
    netAPR,
    currentLtv,
    bAssetLtvsAvg,
    borrowLimit,
    dangerLtv,
  } = useBorrowOverviewData();

  const { totalCollateralValue, collaterals } = useMemo(() => {
    if (!overseerCollaterals || !oraclePrices || !overseerWhitelist) {
      return { totalCollateralValue: big(0) as u<UST<Big>>, collaterals: [] };
    }

    const vector = overseerWhitelist.elems
      .reverse()
      .map(({ collateral_token }) => collateral_token);
    const lockedAmounts = vectorizeOverseerCollaterals(
      vector,
      overseerCollaterals.collaterals,
    );
    const prices = vectorizeOraclePrices(vector, oraclePrices.prices);

    const ustAmounts = vectorMultiply(lockedAmounts, prices);

    const totalCollateralValue = sum(...ustAmounts) as u<UST<Big>>;

    return {
      totalCollateralValue,
      collaterals: ustAmounts.map(
        (ustAmount, i) =>
          ({
            label: prettifySymbol(overseerWhitelist.elems[i].symbol),
            ratio: (totalCollateralValue.gt(0)
              ? big(ustAmount).div(totalCollateralValue).toFixed()
              : '0') as Rate,
            ust: ustAmount.toFixed() as u<UST>,
            asset: lockedAmounts[i] as u<bAsset>,
          } as CollateralItem),
      ),
    };
  }, [oraclePrices, overseerCollaterals, overseerWhitelist]);

  const isEmptyData = useMemo(() => {
    if (!connectedWallet) {
      return true;
    }

    return big(totalCollateralValue).lte(0) && borrowedValue.lte(0);
  }, [borrowedValue, connectedWallet, totalCollateralValue]);

  if (isEmptyData) {
    return <EmptySection to="/borrow">Go to Borrow</EmptySection>;
  }

  return (
    <BorrowRow>
      <TotalCollateralValue
        total={totalCollateralValue}
        collaterals={collaterals}
      />
      <BorrowedValue
        borrowedValue={borrowedValue}
        netAPR={netAPR}
        currentLtv={currentLtv}
        dangerLtv={dangerLtv}
        bAssetLtvsAvg={bAssetLtvsAvg}
        borrowLimit={borrowLimit}
      />
    </BorrowRow>
  );
}

const BorrowRow = styled.div`
  display: flex;
  gap: 40px;

  .NeuSection-root {
    margin-bottom: 0;
  }

  > * {
    flex: 1;
  }

  @media (max-width: 1200px) {
    flex-direction: column;

    > :nth-child(2) {
      width: 100%;
    }
  }
`;
