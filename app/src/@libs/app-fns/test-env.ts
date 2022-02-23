import {
  defaultHiveFetcher,
  defaultLcdFetcher,
  HiveQueryClient,
  LcdQueryClient,
} from '@libs/query-client';
import { CW20Addr, HumanAddr } from '@libs/types';

export const TEST_HIVE_CLIENT: HiveQueryClient = {
  hiveEndpoint: 'https://bombay-mantle.daodiseo.dev',
  hiveFetcher: defaultHiveFetcher,
};

export const TEST_LCD_CLIENT: LcdQueryClient = {
  lcdEndpoint: 'https://bombay-lcd.daodiseo.dev',
  lcdFetcher: defaultLcdFetcher,
};

export const TEST_WALLET_ADDRESS =
  'daodiseo12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9' as HumanAddr;

export const TEST_CONTRACT_ADDRESS = {
  daodiseoswap: {
    factory: 'daodiseo18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf' as HumanAddr,
  },
  astroport: {
    generator: 'daodiseo1gjm7d9nmewn27qzrvqyhda8zsfl40aya7tvaw5' as HumanAddr,
  },
  cw20: {
    AncUstLp: 'daodiseo1agu2qllktlmf0jdkuhcheqtchnkppzrl4759y6' as CW20Addr,
  },
};
