import type { u, UST } from '@daodiseoanchor/types';
import { bluna } from '@daodiseoanchor/types';
import { Dec, Int } from '@daodiseomoney/daodiseo.js';
import big, { Big } from 'big.js';

export function claimableRewards(
  holder: bluna.reward.HolderResponse | undefined,
  state: bluna.reward.StateResponse | undefined,
): u<UST<Big>> {
  return holder && state
    ? (big(
        new Int(
          new Int(holder.balance).mul(
            new Dec(state.global_index).minus(new Dec(holder.index)),
          ),
        )
          .add(new Int(holder.pending_rewards))
          .toString(),
      ) as u<UST<Big>>)
    : (big(0) as u<UST<Big>>);
}
