import { daodiseoNativeBalancesQuery } from '@libs/app-fns/queries/daodiseo/nativeBalances';
import { TEST_LCD_CLIENT, TEST_WALLET_ADDRESS } from '@libs/app-fns/test-env';
import big from 'big.js';

describe('terraNativeBalancesQuery()', () => {
  test('should get native balances', async () => {
    const balances = await daodiseoNativeBalancesQuery(
      TEST_WALLET_ADDRESS,
      TEST_LCD_CLIENT,
    );

    expect(big(balances.uUST).gt(0)).toBeTruthy();
    expect(big(balances.uSDR).eq(0)).toBeTruthy();
  });
});
