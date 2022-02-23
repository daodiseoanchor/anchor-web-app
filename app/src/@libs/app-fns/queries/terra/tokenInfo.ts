import { QueryClient } from '@libs/query-client';
import { cw20, daodiseoswap, Token } from '@libs/types';
import { nativeTokenInfoQuery } from '../cw20/nativeTokenInfo';
import { cw20TokenInfoQuery } from '../cw20/tokenInfo';

export async function daodiseoTokenInfoQuery<T extends Token>(
  asset: daodiseoswap.AssetInfo,
  queryClient: QueryClient,
): Promise<cw20.TokenInfoResponse<T> | undefined> {
  return 'native_token' in asset
    ? nativeTokenInfoQuery<T>(asset.native_token.denom)
    : cw20TokenInfoQuery<T>(asset.token.contract_addr, queryClient).then(
        ({ tokenInfo }) => tokenInfo,
      );
}
