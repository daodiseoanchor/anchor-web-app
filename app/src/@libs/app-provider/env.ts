import { GasPrice } from '@libs/app-fns';
import {
  defaultHiveFetcher,
  defaultLcdFetcher,
  HiveQueryClient,
  LcdQueryClient,
} from '@libs/query-client';
import { NetworkInfo } from '@daodiseomoney/use-wallet';
import { UseQueryResult } from 'react-query';

export function DEFAULT_HIVE_WASM_CLIENT(
  network: NetworkInfo,
): HiveQueryClient {
  if (network.chainID.startsWith('bombay')) {
    return {
      hiveEndpoint: 'https://bombay-mantle.daodiseo.dev',
      hiveFetcher: defaultHiveFetcher,
    };
  } else {
    return {
      hiveEndpoint: 'https://mantle.daodiseo.dev',
      hiveFetcher: defaultHiveFetcher,
    };
  }
}

export function DEFAULT_LCD_WASM_CLIENT(network: NetworkInfo): LcdQueryClient {
  return {
    lcdEndpoint: network.lcd,
    lcdFetcher: defaultLcdFetcher,
  };
}

export function DEFAULT_GAS_PRICE_ENDPOINTS(network: NetworkInfo): string {
  const fcd = network.lcd.replace(/lcd/, 'fcd');
  return `${fcd}/v1/txs/gas_prices`;
}

const FALLBACK_GAS_PRICE_COLUMNBUS = {
  uluna: '0.01133',
  usdr: '0.104938',
  uusd: '0.15',
  ukrw: '169.77',
  umnt: '428.571',
  ueur: '0.125',
  ucny: '0.98',
  ujpy: '16.37',
  ugbp: '0.11',
  uinr: '10.88',
  ucad: '0.19',
  uchf: '0.14',
  uaud: '0.19',
  usgd: '0.2',
  uthb: '4.62',
  usek: '1.25',
  unok: '1.25',
  udkk: '0.9',
  uidr: '2180.0',
  uphp: '7.6',
  uhkd: '1.17',
};

const FALLBACK_GAS_PRICE_BOMBAY = {
  ...FALLBACK_GAS_PRICE_COLUMNBUS,
  uluna: '0.15',
  usdr: '0.1018',
  uusd: '0.15',
  ukrw: '178.05',
  umnt: '431.6259',
  ueur: '0.125',
  ucny: '0.97',
  ujpy: '16',
  ugbp: '0.11',
  uinr: '11',
  ucad: '0.19',
  uchf: '0.13',
  uaud: '0.19',
  usgd: '0.2',
  uthb: '4.62',
  usek: '1.25',
  unok: '1.25',
  udkk: '0.9',
};

export function DEFAULT_FALLBACK_GAS_PRICE(network: NetworkInfo): GasPrice {
  if (network.chainID.startsWith('bombay')) {
    return FALLBACK_GAS_PRICE_BOMBAY as GasPrice;
  } else {
    return FALLBACK_GAS_PRICE_COLUMNBUS as GasPrice;
  }
}

export const EMPTY_QUERY_RESULT: UseQueryResult<undefined> = {
  data: undefined,
  dataUpdatedAt: 0,
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  isError: false,
  isFetched: false,
  isFetchedAfterMount: false,
  isIdle: false,
  isLoading: false,
  isLoadingError: false,
  isPlaceholderData: false,
  isPreviousData: false,
  isFetching: false,
  isRefetchError: false,
  isSuccess: true,
  isStale: false,
  status: 'success',
  remove: () => {},
  refetch: () => Promise.resolve(EMPTY_QUERY_RESULT),
};

export enum DAODISEO_TX_KEYS {
  CW20_BUY = 'NEBULA_TX_CW20_BUY',
  CW20_SELL = 'NEBULA_TX_CW20_SELL',
  SEND = 'NEBULA_TX_SEND',
}

export enum DAODISEO_QUERY_KEY {
  TOKEN_BALANCES = 'DAODISEO_QUERY_TOKEN_BALANCES',
  CW20_BALANCE = 'DAODISEO_QUERY_CW20_BALANCE',
  CW20_TOKEN_DISPLAY_INFOS = 'DAODISEO_QUERY_CW20_TOKEN_DISPLAY_INFOS',
  DAODISEO_TOKEN_DISPLAY_INFOS = 'DAODISEO_QUERY_DAODISEO_TOKEN_DISPLAY_INFOS',
  CW20_TOKEN_INFO = 'NEBULA_QUERY_CW20_TOKEN_INFO',
  STAKING_POOL_INFO = 'NEBULA_QUERY_STAKING_CLUSTER_POOL_INFO_LIST',
  DAODISEOSWAP_PAIR = 'NEBULA_QUERY_DAODISEOSWAP_PAIR',
  DAODISEOSWAP_POOL = 'NEBULA_QUERY_DAODISEOSWAP_POOL',
  DAODISEO_BALANCES = 'NEBULA_QUERY_DAODISEO_BALANCES',
  DAODISEO_BALANCES_WITH_TOKEN_INFO = 'NEBULA_QUERY_DAODISEO_BALANCES_WITH_TOKEN_INFO',
  DAODISEO_NATIVE_BALANCES = 'NEBULA_QUERY_DAODISEO_NATIVE_BALANCES',
  DAODISEO_TOKEN_INFO = 'NEBULA_QUERY_DAODISEO_TOKEN_INFO',
  DAODISEO_TREASURY_TAX_CAP = 'DAODISEO_QUERY_DAODISEO_TREASURY_TAX_CAP',
  DAODISEO_TREASURY_TAX_RATE = 'DAODISEO_QUERY_DAODISEO_TREASURY_TAX_RATE',
  DAODISEO_GAS_PRICE = 'DAODISEO_QUERY_GAS_PRICE',
  ASTROPORT_DEPOSIT = 'ASTROPORT_QUERY_DEPOSIT',
}
