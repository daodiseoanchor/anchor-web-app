import { govMyPollsQuery } from '@daodiseoanchor/app-fns';
import {
  TEST_ADDRESSES,
  TEST_WALLET_ADDRESS,
} from '@daodiseoanchor/app-fns/test-env';
import { TEST_LCD_CLIENT } from '@libs/app-fns/test-env';

describe('queries/myPolls', () => {
  test('should get result from query', async () => {
    const myPolls = await govMyPollsQuery(
      TEST_WALLET_ADDRESS,
      TEST_ADDRESSES.anchorToken.gov,
      TEST_LCD_CLIENT,
    );

    expect(Array.isArray(myPolls)).toBeTruthy();
  });
});
