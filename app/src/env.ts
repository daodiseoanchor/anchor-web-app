import {
  ANCHOR_QUERY_KEY,
  ANCHOR_TX_KEY,
  AnchorConstants,
  AnchorContractAddress,
} from '@anchor-protocol/app-provider';
import { CW20Addr, HumanAddr } from '@anchor-protocol/types';
import { DAODISEO_QUERY_KEY, TxRefetchMap } from '@libs/app-provider';
import { Gas, Rate } from '@libs/types';
import { NetworkInfo } from '@daodiseomoney/wallet-provider';

// ---------------------------------------------
// style
// ---------------------------------------------
export const screen = {
  mobile: { max: 530 },
  // mobile : @media (max-width: ${screen.mobile.max}px)
  tablet: { min: 531, max: 830 },
  // tablet : @media (min-width: ${screen.tablet.min}px) and (max-width: ${screen.tablet.max}px)
  pc: { min: 831, max: 1439 },
  // pc : @media (min-width: ${screen.pc.min}px)
  monitor: { min: 1440 },
  // monitor : @media (min-width: ${screen.pc.min}px) and (max-width: ${screen.pc.max}px)
  // huge monitor : @media (min-width: ${screen.monitor.min}px)
} as const;

export const BODY_MARGIN_TOP = {
  pc: 50,
  mobile: 10,
  tablet: 20,
};

export const mobileHeaderHeight = 68;

// ---------------------------------------------
// links
// ---------------------------------------------
export const links = {
  forum: 'https://forum.anchorprotocol.com/',
  docs: {
    earn: 'https://docs.anchorprotocol.com/user-guide/webapp/earn',
    borrow: 'https://docs.anchorprotocol.com/user-guide/webapp/borrow',
    bond: 'https://docs.anchorprotocol.com/user-guide/webapp/bond',
    gov: 'https://docs.anchorprotocol.com/user-guide/webapp/govern',
  },
} as const;

// ---------------------------------------------
// chain
// ---------------------------------------------
export function ANCHOR_QUERY_CLIENT(network: NetworkInfo): 'lcd' | 'hive' {
  if (network.chainID.startsWith('bombay')) {
    return 'lcd';
  } else {
    return 'hive';
  }
  //return 'hive';
}

export function ANCHOR_CONSTANTS(network: NetworkInfo): AnchorConstants {
  return {
    gasWanted: 1_000_000 as Gas,
    fixedGas: 1_671_053 as Gas,
    blocksPerYear: 4_656_810,
    gasAdjustment: 1.6 as Rate<number>,
    airdropGasWanted: 300_000 as Gas,
    airdropGas: 334_211 as Gas,
    bondGasWanted: 1_600_000 as Gas,
    astroportGasWanted: 1_600_000 as Gas,
  };
}

const COLUMNBUS_CONTRACT_ADDRESS = {
  bLunaHub: 'daodiseo1mtwph2juhj0rvjz7dy92gvl6xvukaxu8rfv8ts',
  bLunaToken: 'daodiseo1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp',
  bLunaReward: 'daodiseo17yap3mhph35pcwvhza38c2lkj7gzywzy05h7l0',
  bLunaAirdrop: 'daodiseo199t7hg7w5vymehhg834r6799pju2q3a0ya7ae9',
  bLunaValidatorsRegistry: 'daodiseo10wt548y4y3xeqfrqsgqlqh424lll8fqxp6dyed',
  //bEthReward: 'daodiseo1939tzfn4hn960ychpcsjshu8jds3zdwlp8jed9',
  //bEthToken: 'daodiseo1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun',
  mmInterestModel: 'daodiseo1kq8zzq5hufas9t0kjsjc62t2kucfnx8txf547n',
  mmOracle: 'daodiseo1cgg6yef7qcdm070qftghfulaxmllgmvk77nc7t',
  mmMarket: 'daodiseo1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s',
  mmOverseer: 'daodiseo1tmnqgvg567ypvsvk6rwsga3srp7e3lg6u0elp8',
  mmCustody: 'daodiseo1ptjp2vfjrwh0j0faj9r6katm640kgjxnwwq9kn',
  mmCustodyBEth: 'daodiseo10cxuzggyvvv44magvrh3thpdnk9cmlgk93gmx2',
  mmLiquidation: 'daodiseo1w9ky73v4g7v98zzdqpqgf3kjmusnx4d4mvnac6',
  mmDistributionModel: 'daodiseo14mufqpr5mevdfn92p4jchpkxp7xr46uyknqjwq',
  mmLiquidationQueue: '',
  aDaodiseo: 'daodiseo1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu',
  bLunaLunaPair: 'daodiseo1j66jatn3k50hjtg2xemnjm8s7y8dws9xqa5y8w',
  bLunaLunaLPToken: 'daodiseo1htw7hm40ch0hacm8qpgd24sus4h0tq3hsseatl',
  ancUstPair: 'daodiseo1qr2k6yjjd5p2kaewqvg93ag74k6gyjr7re37fs',
  ancUstLPToken: 'daodiseo1wmaty65yt7mjw6fjfymkd9zsm6atsq82d9arcd',
  gov: 'daodiseo1f32xyep306hhcxxxf7mlyh0ucggc00rm2s9da5',
  distributor: 'daodiseo1mxf7d5updqxfgvchd7lv6575ehhm8qfdttuqzz',
  collector: 'daodiseo14ku9pgw5ld90dexlyju02u4rn6frheexr5f96h',
  community: 'daodiseo12wk8dey0kffwp27l5ucfumczlsc9aned8rqueg',
  staking: 'daodiseo1h3mf22jm68ddueryuv2yxwfmqxxadvjceuaqz6',
  ANC: 'daodiseo14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76',
  airdrop: 'daodiseo146ahqn6d3qgdvmj8cj96hh03dzmeedhsf0kxqm',
  investor_vesting: 'daodiseo1pm54pmw3ej0vfwn3gtn6cdmaqxt0x37e9jt0za',
  team_vesting: 'daodiseo10evq9zxk2m86n3n3xnpw28jpqwp628c6dzuq42',
  daodiseoswapFactory: 'daodiseo1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj',
  astroportGenerator: 'daodiseo1zgrx9jjqrfye8swykfgmd6hpde60j0nszzupp9',
  vesting: 'daodiseo13v4ln23tmfs2zk4nh5dw5mzufckekp4fpafpcy',
};

const BOMBAY_CONTRACT_ADDRESS = {
  bLunaHub: 'daodiseo1fflas6wv4snv8lsda9knvq2w0cyt493r8puh2e',
  bLunaToken: 'daodiseo1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x',
  bLunaReward: 'daodiseo1ac24j6pdxh53czqyrkr6ygphdeftg7u3958tl2',
  bLunaValidatorsRegistry: '',
  bLunaAirdrop: 'daodiseo1334h20c9ewxguw9p9vdxzmr8994qj4qu77ux6q',
  //bEthReward: 'daodiseo1ja3snkedk4t0zp7z3ljd064hcln8dsv5x004na',
  //bEthToken: 'daodiseo19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l',
  mmInterestModel: 'daodiseo1m25aqupscdw2kw4tnq5ql6hexgr34mr76azh5x',
  mmOracle: 'daodiseo1p4gg3p2ue6qy2qfuxtrmgv2ec3f4jmgqtazum8',
  mmMarket: 'daodiseo15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal',
  mmOverseer: 'daodiseo1qljxd0y3j3gk97025qvl3lgq8ygup4gsksvaxv',
  mmCustody: 'daodiseo1ltnkx0mv7lf2rca9f8w740ashu93ujughy4s7p',
  mmCustodyBEth: 'daodiseo1j6fey5tl70k9fvrv7mea7ahfr8u2yv7l23w5e6',
  mmLiquidation: 'daodiseo16vc4v9hhntswzkuunqhncs9yy30mqql3gxlqfe',
  mmLiquidationQueue: '',
  mmDistributionModel: 'daodiseo1u64cezah94sq3ye8y0ung28x3pxc37tv8fth7h',
  aDaodiseo: 'daodiseo1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl',
  bLunaLunaPair: 'daodiseo1esle9h9cjeavul53dqqws047fpwdhj6tynj5u4',
  bLunaLunaLPToken: 'daodiseo14e7z2ll6eweq6cxe6qkvl28hatapmw2uflxcyt',
  ancUstPair: 'daodiseo13r3vngakfw457dwhw9ef36mc8w6agggefe70d9',
  ancUstLPToken: 'daodiseo1agu2qllktlmf0jdkuhcheqtchnkppzrl4759y6',
  gov: 'daodiseo16ckeuu7c6ggu52a8se005mg5c0kd2kmuun63cu',
  distributor: 'daodiseo1z7nxemcnm8kp7fs33cs7ge4wfuld307v80gypj',
  collector: 'daodiseo1n2q466gq8flc9aqe0jqjhapvq4rjmztlnu38rk',
  community: 'daodiseo17g577z0pqt6tejhceh06y3lyeudfs3v90mzduy',
  staking: 'daodiseo1q68gyyxqnlh58jacz5r6rxfmxqpmmjv583fzqq',
  ANC: 'daodiseo1747mad58h0w4y589y3sk84r5efqdev9q4r02pc',
  airdrop: 'daodiseo1u5ywhlve3wugzqslqvm8ks2j0nsvrqjx0mgxpk',
  investor_vesting: 'not available in testnet',
  team_vesting: 'not available in testnet',
  daodiseoswapFactory: 'daodiseo18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf',
  astroportGenerator: 'daodiseo1gjm7d9nmewn27qzrvqyhda8zsfl40aya7tvaw5',
  vesting: 'daodiseo15rq8j7auyyd6ydcfkktm3kdagcg56228uclkzy',
};

export const ANCHOR_CONTRACT_ADDRESS = (
  network: NetworkInfo,
): AnchorContractAddress => {
  const addressMap = network.chainID.startsWith('bombay')
    ? BOMBAY_CONTRACT_ADDRESS
    : COLUMNBUS_CONTRACT_ADDRESS;
  //const addressProvider: AddressProvider = new AddressProviderFromJson(
  //  addressMap,
  //);
  //
  //const bLunaCollateral: CollateralInfo = {
  //  type: CollateralType.bLuna,
  //  denom: COLLATERAL_DENOMS.UBLUNA,
  //  custody: addressProvider.custody(
  //    MARKET_DENOMS.UUSD,
  //    COLLATERAL_DENOMS.UBLUNA,
  //  ) as HumanAddr,
  //  token: addressProvider.bLunaToken() as CW20Addr,
  //};
  //
  //const bEthCollateral: CollateralInfo = {
  //  type: CollateralType.bEth,
  //  denom: COLLATERAL_DENOMS.UBETH,
  //  custody: addressProvider.custody(
  //    MARKET_DENOMS.UUSD,
  //    COLLATERAL_DENOMS.UBETH,
  //  ) as HumanAddr,
  //  token: addressProvider.bEthToken() as CW20Addr,
  //};

  return {
    bluna: {
      reward: addressMap.bLunaReward as HumanAddr,
      hub: addressMap.bLunaHub as HumanAddr,
      airdropRegistry: addressMap.airdrop as HumanAddr,
      validatorsRegistry: addressMap.bLunaValidatorsRegistry as HumanAddr,
      custody: addressMap.mmCustody as HumanAddr,
    },
    moneyMarket: {
      market: addressMap.mmMarket as HumanAddr,
      //collaterals: {
      //  [CollateralType.bLuna]: bLunaCollateral,
      //  [CollateralType.bEth]: bEthCollateral,
      //},
      //collateralsArray: [bLunaCollateral, bEthCollateral],
      overseer: addressMap.mmOverseer as HumanAddr,
      oracle: addressMap.mmOracle as HumanAddr,
      interestModel: addressMap.mmInterestModel as HumanAddr,
      distributionModel: addressMap.mmDistributionModel as HumanAddr,
    },
    liquidation: {
      liquidationContract: addressMap.mmLiquidation as HumanAddr,
    },
    anchorToken: {
      gov: addressMap.gov as HumanAddr,
      staking: addressMap.staking as HumanAddr,
      community: addressMap.community as HumanAddr,
      distributor: addressMap.distributor as HumanAddr,
      investorLock: addressMap.investor_vesting as HumanAddr,
      teamLock: addressMap.team_vesting as HumanAddr,
      collector: addressMap.collector as HumanAddr,
      vesting: addressMap.vesting as HumanAddr,
    },
    daodiseoswap: {
      factory: addressMap.daodiseoswapFactory as HumanAddr,
      blunaLunaPair: addressMap.bLunaLunaPair as HumanAddr,
      ancUstPair: addressMap.ancUstPair as HumanAddr,
    },
    astroport: {
      generator: addressMap.astroportGenerator as HumanAddr,
    },
    cw20: {
      bLuna: addressMap.bLunaToken as CW20Addr,
      //bEth: addressMap.bEthToken as CW20Addr,
      aUST: addressMap.aDaodiseo as CW20Addr,
      ANC: addressMap.ANC as CW20Addr,
      AncUstLP: addressMap.ancUstLPToken as CW20Addr,
      bLunaLunaLP: addressMap.bLunaLunaLPToken as CW20Addr,
    },
  };
};

export const ANCHOR_INDEXER_API_ENDPOINTS = (network: NetworkInfo): string => {
  if (network.chainID.startsWith('bombay')) {
    return 'https://api-testnet.anchorprotocol.com/api';
  } else {
    return 'https://api.anchorprotocol.com/api';
  }
};

// ---------------------------------------------
// query refetch
// ---------------------------------------------
export const ANCHOR_TX_REFETCH_MAP: TxRefetchMap = {
  [ANCHOR_TX_KEY.EARN_DEPOSIT]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.EARN_EPOCH_STATES,
    {
      queryKey: ANCHOR_QUERY_KEY.EARN_TRANSACTION_HISTORY,
      wait: 1000 * 3,
    },
  ],
  [ANCHOR_TX_KEY.EARN_WITHDRAW]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.EARN_EPOCH_STATES,
    {
      queryKey: ANCHOR_QUERY_KEY.EARN_TRANSACTION_HISTORY,
      wait: 1000 * 3,
    },
  ],
  [ANCHOR_TX_KEY.BORROW_BORROW]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_REPAY]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_PROVIDE_COLLATERAL]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BORROW_REDEEM_COLLATERAL]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BORROW_MARKET,
    ANCHOR_QUERY_KEY.BORROW_BORROWER,
    ANCHOR_QUERY_KEY.BORROW_APY,
    ANCHOR_QUERY_KEY.BORROW_COLLATERAL_BORROWER,
  ],
  [ANCHOR_TX_KEY.BASSET_IMPORT]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BASSET_EXPORT]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_MINT]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_BURN]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_SWAP]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
  ],
  [ANCHOR_TX_KEY.BOND_CLAIM]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BOND_CLAIMABLE_REWARDS,
    ANCHOR_QUERY_KEY.BOND_BETH_CLAIMABLE_REWARDS,
  ],
  [ANCHOR_TX_KEY.BOND_WITHDRAW]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.BOND_WITHDRAWABLE_AMOUNT,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_PROVIDE]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_WITHDRAW]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_STAKE]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    DAODISEO_QUERY_KEY.ASTROPORT_DEPOSIT,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.ANC_LP_STAKING_STATE,
  ],
  [ANCHOR_TX_KEY.ANC_ANC_UST_LP_UNSTAKE]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    DAODISEO_QUERY_KEY.ASTROPORT_DEPOSIT,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.ANC_LP_STAKING_STATE,
  ],
  [ANCHOR_TX_KEY.ANC_BUY]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_SELL]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
  ],
  [ANCHOR_TX_KEY.ANC_GOVERNANCE_STAKE]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.ANC_GOVERNANCE_UNSTAKE]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.GOV_CREATE_POLL]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.GOV_POLLS,
    ANCHOR_QUERY_KEY.GOV_MYPOLLS,
  ],
  [ANCHOR_TX_KEY.GOV_VOTE]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.GOV_POLL,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.GOV_VOTERS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_ALL_CLAIM]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_ANC_UST_LP_CLAIM]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.REWARDS_UST_BORROW_CLAIM]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.ANC_BALANCE,
    ANCHOR_QUERY_KEY.REWARDS_ANC_GOVERNANCE_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANCHOR_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_ANC_UST_LP_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_CLAIMABLE_UST_BORROW_REWARDS,
    ANCHOR_QUERY_KEY.REWARDS_UST_BORROW_REWARDS,
  ],
  [ANCHOR_TX_KEY.AIRDROP_CLAIM]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
    ANCHOR_QUERY_KEY.AIRDROP_CHECK,
  ],
  [ANCHOR_TX_KEY.DAODISEO_SEND]: [
    DAODISEO_QUERY_KEY.TOKEN_BALANCES,
    DAODISEO_QUERY_KEY.CW20_BALANCE,
    DAODISEO_QUERY_KEY.DAODISEO_BALANCES,
    DAODISEO_QUERY_KEY.DAODISEO_NATIVE_BALANCES,
  ],
};

// build: force re-build trigger - 22.01.03-1
