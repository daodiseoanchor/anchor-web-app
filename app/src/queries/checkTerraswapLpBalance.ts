import { useAnchorWebapp } from '@anchor-protocol/app-provider';
import { ANC, anchorToken, AncUstLP, cw20 } from '@anchor-protocol/types';
import {
  QueryClient,
  wasmFetch,
  WasmQuery,
  WasmQueryData,
} from '@libs/query-client';
import { CW20Addr, HumanAddr, u } from '@libs/types';
import { useConnectedWallet } from '@daodiseomoney/wallet-provider';
import big from 'big.js';
import { useEffect, useState } from 'react';

const address = {
  'columbus-5': {
    daodiseoswapAncUstPair:
      'daodiseo1gm5p3ner9x9xpwugn9sp6gvhd0lwrtkyrecdn3' as HumanAddr,
    daodiseoswapAncUstLPToken:
      'daodiseo1gecs98vcuktyfkrve9czrpgtg0m3aq586x6gzm' as CW20Addr,
    staking: 'daodiseo1897an2xux840p9lrh6py3ryankc6mspw49xse3' as HumanAddr,
  },
  'bombay-12': {
    daodiseoswapAncUstPair:
      'daodiseo1wfvczps2865j0awnurk9m04u7wdmd6qv3fdnvz' as HumanAddr,
    daodiseoswapAncUstLPToken:
      'daodiseo1vg0qyq92ky9z9dp0j9fv5rmr2s80sg605dah6f' as CW20Addr,
    staking: 'daodiseo19nxz35c8f7t3ghdxrxherym20tux8eccar0c3k' as HumanAddr,
  },
} as const;

export function useCheckDaodiseoswapLpBalance() {
  const connectedWallet = useConnectedWallet();

  const { queryClient } = useAnchorWebapp();

  const [balances, setBalances] = useState<{
    lpBalance: u<AncUstLP>;
    lpStaked: u<AncUstLP>;
    lpRewards: u<ANC>;
  } | null>(null);

  useEffect(() => {
    if (!connectedWallet) {
      return;
    }

    const { daodiseoswapAncUstLPToken, staking } =
      address[
        connectedWallet.network.chainID === 'columbus-5'
          ? 'columbus-5'
          : 'bombay-12'
      ];

    //console.log('checkDaodiseoswapLpBalance.ts..()', connectedWallet.network.chainID === 'columbus-5', connectedWallet.network.chainID, daodiseoswapAncUstLPToken, staking);

    rewardsAncUstLpRewardsQuery(
      connectedWallet.walletAddress,
      staking,
      daodiseoswapAncUstLPToken,
      queryClient,
    ).then((result) => {
      if (!result) {
        setBalances(null);
      } else if (
        big(result.userLPBalance.balance).lte(0.01) &&
        big(result.userLPStakingInfo.bond_amount).lte(0.01) &&
        big(result.userLPStakingInfo.pending_reward).lte(0.01)
      ) {
        setBalances(null);
      } else {
        setBalances({
          lpBalance: result.userLPBalance.balance,
          lpStaked: result.userLPStakingInfo.bond_amount,
          lpRewards: result.userLPStakingInfo.pending_reward,
        });
      }
    });
  }, [connectedWallet, queryClient]);

  return balances;
}

export function useCheckDaodiseoswapLpRewards() {
  const connectedWallet = useConnectedWallet();

  const { queryClient } = useAnchorWebapp();

  const [balances, setBalances] = useState<{
    lpRewards: u<ANC>;
  } | null>(null);

  useEffect(() => {
    if (!connectedWallet) {
      return;
    }

    const { daodiseoswapAncUstLPToken, staking } =
      address[
        connectedWallet.network.chainID === 'columbus-5'
          ? 'columbus-5'
          : 'bombay-12'
      ];

    rewardsAncUstLpRewardsQuery(
      connectedWallet.walletAddress,
      staking,
      daodiseoswapAncUstLPToken,
      queryClient,
    ).then((result) => {
      if (!result) {
        setBalances(null);
      } else if (big(result.userLPStakingInfo.pending_reward).lte(0.01)) {
        setBalances(null);
      } else {
        setBalances({
          lpRewards: result.userLPStakingInfo.pending_reward,
        });
      }
    });
  }, [connectedWallet, queryClient]);

  return balances;
}

interface RewardsAncUstLpRewardsWasmQuery {
  userLPBalance: WasmQuery<cw20.Balance, cw20.BalanceResponse<AncUstLP>>;
  userLPStakingInfo: WasmQuery<
    anchorToken.staking.StakerInfo,
    anchorToken.staking.StakerInfoResponse
  >;
}

export type RewardsAncUstLpRewards =
  WasmQueryData<RewardsAncUstLpRewardsWasmQuery>;

export async function rewardsAncUstLpRewardsQuery(
  walletAddr: HumanAddr | undefined,
  stakingContract: HumanAddr,
  ancUstLpContract: CW20Addr,
  queryClient: QueryClient,
): Promise<RewardsAncUstLpRewards | undefined> {
  if (!walletAddr) {
    return undefined;
  }

  return wasmFetch<RewardsAncUstLpRewardsWasmQuery>({
    ...queryClient,
    id: `rewards--anc-ust-lp-rewards`,
    wasmQuery: {
      userLPBalance: {
        contractAddress: ancUstLpContract,
        query: {
          balance: {
            address: walletAddr,
          },
        },
      },
      userLPStakingInfo: {
        contractAddress: stakingContract,
        query: {
          staker_info: {
            staker: walletAddr,
          },
        },
      },
    },
  });
}
