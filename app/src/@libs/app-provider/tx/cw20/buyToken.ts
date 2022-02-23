import { cw20BuyTokenTx } from '@libs/app-fns';
import { useFixedFee } from '@libs/app-provider/hooks/useFixedFee';
import { formatExecuteMsgNumber } from '@libs/formatter';
import { HumanAddr, Rate, Token, u, UST } from '@libs/types';
import { useConnectedWallet } from '@daodiseomoney/use-wallet';
import big from 'big.js';
import { useCallback } from 'react';
import { useApp } from '../../contexts/app';
import { DAODISEO_TX_KEYS } from '../../env';
import { useRefetchQueries } from '../../hooks/useRefetchQueries';
import { useUstTax } from '../../queries/daodiseo/tax';
import { useDaodiseoswapPoolQuery } from '../../queries/daodiseoswap/pool';

export interface CW20BuyTokenTxParams {
  buyAmount: u<UST>;
  txFee: u<UST>;
  maxSpread: Rate;

  onTxSucceed?: () => void;
}

export function useCW20BuyTokenTx(
  tokenUstPairAddr: HumanAddr,
  tokenSymbol: string,
) {
  const connectedWallet = useConnectedWallet();

  const { queryClient, txErrorReporter, constants } = useApp();

  const fixedFee = useFixedFee();

  const refetchQueries = useRefetchQueries();

  const { taxRate, maxTax } = useUstTax();

  const { data: { daodiseoswapPool } = {} } =
    useDaodiseoswapPoolQuery<Token>(tokenUstPairAddr);

  const stream = useCallback(
    ({ buyAmount, txFee, maxSpread, onTxSucceed }: CW20BuyTokenTxParams) => {
      if (
        !connectedWallet ||
        !connectedWallet.availablePost ||
        !daodiseoswapPool
      ) {
        throw new Error(`Can't post!`);
      }

      const tokenPoolSize = daodiseoswapPool.assets[0]?.amount as u<Token>;
      const ustPoolSize = daodiseoswapPool.assets[1]?.amount as u<UST>;

      return cw20BuyTokenTx({
        txFee,
        buyAmount,
        beliefPrice: formatExecuteMsgNumber(
          big(ustPoolSize).div(tokenPoolSize),
        ) as UST,
        tokenUstPairAddr,
        tokenSymbol,
        taxRate,
        maxTaxUUSD: maxTax,
        maxSpread,
        buyerAddr: connectedWallet.walletAddress,
        fixedFee,
        gasWanted: constants.gasWanted,
        gasAdjustment: constants.gasAdjustment,
        queryClient,
        txErrorReporter,
        onTxSucceed: () => {
          onTxSucceed?.();
          refetchQueries(DAODISEO_TX_KEYS.CW20_BUY);
        },
        network: connectedWallet.network,
        post: connectedWallet.post,
      });
    },
    [
      connectedWallet,
      constants.gasAdjustment,
      constants.gasWanted,
      fixedFee,
      maxTax,
      refetchQueries,
      taxRate,
      daodiseoswapPool,
      tokenSymbol,
      tokenUstPairAddr,
      txErrorReporter,
      queryClient,
    ],
  );

  return connectedWallet ? stream : null;
}
