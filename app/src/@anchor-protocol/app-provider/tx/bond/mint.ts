import { bondMintTx } from '@daodiseoanchor/app-fns';
import { Gas, Luna, Rate, u, UST } from '@daodiseoanchor/types';
import { useRefetchQueries } from '@libs/app-provider';
import { useStream } from '@rx-stream/react';
import { useConnectedWallet } from '@daodiseomoney/wallet-provider';
import { useCallback } from 'react';
import { useAnchorWebapp } from '../../contexts/context';
import { ANCHOR_TX_KEY } from '../../env';

export interface BondMintTxParams {
  bondAmount: Luna;
  gasWanted: Gas;
  txFee: u<UST>;
  exchangeRate: Rate<string>;
  onTxSucceed?: () => void;
}

export function useBondMintTx() {
  const connectedWallet = useConnectedWallet();

  const { queryClient, txErrorReporter, contractAddress, constants } =
    useAnchorWebapp();

  const refetchQueries = useRefetchQueries();

  const stream = useCallback(
    ({
      bondAmount,
      gasWanted,
      txFee,
      exchangeRate,
      onTxSucceed,
    }: BondMintTxParams) => {
      if (!connectedWallet || !connectedWallet.availablePost) {
        throw new Error('Can not post!');
      }

      return bondMintTx({
        // fabricatebAssetBond
        bondAmount,
        walletAddr: connectedWallet.walletAddress,
        bAssetHubAddr: contractAddress.bluna.hub,
        // post
        network: connectedWallet.network,
        post: connectedWallet.post,
        fixedGas: txFee,
        exchangeRate,
        gasFee: gasWanted,
        gasAdjustment: constants.gasAdjustment,
        // query
        queryClient,
        // error
        txErrorReporter,
        // side effect
        onTxSucceed: () => {
          onTxSucceed?.();
          refetchQueries(ANCHOR_TX_KEY.BOND_MINT);
        },
      });
    },
    [
      connectedWallet,
      contractAddress.bluna.hub,
      constants.gasAdjustment,
      queryClient,
      txErrorReporter,
      refetchQueries,
    ],
  );

  const streamReturn = useStream(stream);

  return connectedWallet ? streamReturn : [null, null];
}
