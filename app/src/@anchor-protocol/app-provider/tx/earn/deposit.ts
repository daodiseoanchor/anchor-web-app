import { useStream } from '@rx-stream/react';
import { useAccount } from 'contexts/account';
import { useAnchorApi } from 'contexts/api';

// export interface EarnDepositTxParams {
//   depositAmount: UST;
//   txFee: u<UST>;
//   onTxSucceed?: () => void;
// }

// export function useEarnDepositTx() {
//   const connectedWallet = useConnectedWallet();

//   const { addressProvider, constants, txErrorReporter, queryClient } =
//     useAnchorWebapp();

//   const refetchQueries = useRefetchQueries();

//   const stream = useCallback(
//     ({ depositAmount, txFee, onTxSucceed }: EarnDepositTxParams) => {
//       if (!connectedWallet || !connectedWallet.availablePost) {
//         throw new Error('Can not post!');
//       }

//       return earnDepositTx({
//         // fabricateMarketDepositStableCoin
//         address: connectedWallet.walletAddress,
//         market: MARKET_DENOMS.UUSD,
//         amount: depositAmount,
//         // post
//         network: connectedWallet.network,
//         post: connectedWallet.post,
//         txFee,
//         gasFee: constants.gasWanted,
//         gasAdjustment: constants.gasAdjustment,
//         addressProvider,
//         // query
//         queryClient,
//         // error
//         txErrorReporter,
//         // side effect
//         onTxSucceed: () => {
//           onTxSucceed?.();
//           refetchQueries(ANCHOR_TX_KEY.EARN_DEPOSIT);
//         },
//       });
//     },
//     [
//       connectedWallet,
//       constants.gasWanted,
//       constants.gasAdjustment,
//       addressProvider,
//       queryClient,
//       txErrorReporter,
//       refetchQueries,
//     ],
//   );

//   const streamReturn = useStream(stream);

//   return connectedWallet ? streamReturn : [null, null];
// }

export function useEarnDepositTx() {
  const { connected } = useAccount();

  const { deposit } = useAnchorApi();

  const streamReturn = useStream(deposit);

  return connected ? streamReturn : [null, null];
}
