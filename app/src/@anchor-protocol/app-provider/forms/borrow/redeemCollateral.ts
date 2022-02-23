import {
  BorrowBorrower,
  BorrowMarket,
  borrowRedeemCollateralForm,
} from '@daodiseoanchor/app-fns';
import { useAnchorBank } from '@daodiseoanchor/app-provider/hooks/useAnchorBank';
import { useBorrowBorrowerQuery } from '@daodiseoanchor/app-provider/queries/borrow/borrower';
import { useBorrowMarketQuery } from '@daodiseoanchor/app-provider/queries/borrow/market';
import { bAsset } from '@daodiseoanchor/types';
import { useCW20Balance, useFixedFee } from '@libs/app-provider';
import { CW20Addr } from '@libs/types';
import { useForm } from '@libs/use-form';
import { useConnectedWallet } from '@daodiseomoney/wallet-provider';

export function useBorrowRedeemCollateralForm(
  collateralToken: CW20Addr,
  fallbackBorrowMarket: BorrowMarket,
  fallbackBorrowBorrower: BorrowBorrower,
) {
  const connectedWallet = useConnectedWallet();

  const fixedFee = useFixedFee();

  const { tokenBalances } = useAnchorBank();

  const ubAssetBalance = useCW20Balance<bAsset>(
    collateralToken,
    connectedWallet?.walletAddress,
  );

  const {
    data: {
      oraclePrices,
      bAssetLtvs,
      bAssetLtvsAvg,
      overseerWhitelist,
    } = fallbackBorrowMarket,
  } = useBorrowMarketQuery();

  const {
    data: { marketBorrowerInfo, overseerCollaterals } = fallbackBorrowBorrower,
  } = useBorrowBorrowerQuery();

  return useForm(
    borrowRedeemCollateralForm,
    {
      collateralToken,
      userBAssetBalance: ubAssetBalance,
      userUSTBalance: tokenBalances.uUST,
      connected: !!connectedWallet,
      oraclePrices,
      overseerCollaterals,
      marketBorrowerInfo,
      overseerWhitelist,
      fixedFee,
      bAssetLtvsAvg,
      bAssetLtvs,
    },
    () => ({ redeemAmount: '' as bAsset }),
  );
}
