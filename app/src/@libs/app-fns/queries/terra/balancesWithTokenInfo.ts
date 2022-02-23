import { QueryClient } from '@libs/query-client';
import { cw20, HumanAddr, daodiseoswap, Token, u } from '@libs/types';
import { nativeTokenInfoQuery } from '../cw20/nativeTokenInfo';
import { cw20TokenInfoQuery } from '../cw20/tokenInfo';
import { daodiseoBalancesQuery } from './balances';

export type DaodiseoBalancesWithTokenInfo = {
  tokens: Array<{
    asset: daodiseoswap.AssetInfo;
    balance: u<Token>;
    info: cw20.TokenInfoResponse<Token> | undefined;
  }>;
};

export async function daodiseoBalancesWithTokenInfoQuery(
  walletAddr: HumanAddr | undefined,
  assets: daodiseoswap.AssetInfo[],
  queryClient: QueryClient,
): Promise<DaodiseoBalancesWithTokenInfo> {
  const { balances } = await daodiseoBalancesQuery(
    walletAddr,
    assets,
    queryClient,
  );

  const tokenInfos = await Promise.all(
    assets.map((asset) => {
      if ('native_token' in asset) {
        return Promise.resolve(nativeTokenInfoQuery(asset.native_token.denom));
      } else {
        return cw20TokenInfoQuery(asset.token.contract_addr, queryClient).then(
          ({ tokenInfo }) => tokenInfo,
        );
      }
    }),
  );

  return {
    tokens: balances.map(({ balance, asset }, i) => {
      return {
        balance,
        asset,
        info: tokenInfos[i],
      };
    }),
  };
}
