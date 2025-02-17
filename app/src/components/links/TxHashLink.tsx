import { truncate } from '@libs/formatter';
import { useWallet } from '@daodiseomoney/wallet-provider';
import React from 'react';

export interface TxHashProps {
  txHash: string;
}

export function TxHashLink({ txHash }: TxHashProps) {
  const { network } = useWallet();

  return (
    <a
      href={`https://finder.daodiseo.money/${network.chainID}/tx/${txHash}`}
      target="_blank"
      rel="noreferrer"
    >
      {truncate(txHash)}
    </a>
  );
}
