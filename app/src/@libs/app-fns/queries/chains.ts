import { NetworkInfo } from '@daodiseomoney/use-wallet';

export function chains(): Promise<Record<string, NetworkInfo>> {
  return fetch('https://assets.daodiseo.money/chains.json').then((res) =>
    res.json(),
  );
}
