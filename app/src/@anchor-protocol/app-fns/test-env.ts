import { CW20Addr, HumanAddr } from '@daodiseoanchor/types';

export const TEST_ADDRESSES = {
  bluna: {
    reward: 'daodiseo1ac24j6pdxh53czqyrkr6ygphdeftg7u3958tl2' as HumanAddr,
    hub: 'daodiseo1fflas6wv4snv8lsda9knvq2w0cyt493r8puh2e' as HumanAddr,
    airdropRegistry:
      'daodiseo1u5ywhlve3wugzqslqvm8ks2j0nsvrqjx0mgxpk' as HumanAddr,
  },
  beth: {
    reward: 'daodiseo1ja3snkedk4t0zp7z3ljd064hcln8dsv5x004na' as HumanAddr,
  },
  moneyMarket: {
    market: 'daodiseo15dwd5mj8v59wpj0wvt233mf5efdff808c5tkal' as HumanAddr,
    collaterals: {
      bLuna: {
        type: 'bLuna',
        denom: 'ubluna',
        custody: 'daodiseo1ltnkx0mv7lf2rca9f8w740ashu93ujughy4s7p' as HumanAddr,
        token: 'daodiseo1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x' as CW20Addr,
      },
      bEth: {
        type: 'bEth',
        denom: 'ubeth',
        custody: 'daodiseo1j6fey5tl70k9fvrv7mea7ahfr8u2yv7l23w5e6' as HumanAddr,
        token: 'daodiseo19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l' as CW20Addr,
      },
    },
    collateralsArray: [
      {
        type: 'bLuna',
        denom: 'ubluna',
        custody: 'daodiseo1ltnkx0mv7lf2rca9f8w740ashu93ujughy4s7p' as HumanAddr,
        token: 'daodiseo1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x' as CW20Addr,
      },
      {
        type: 'bEth',
        denom: 'ubeth',
        custody: 'daodiseo1j6fey5tl70k9fvrv7mea7ahfr8u2yv7l23w5e6' as HumanAddr,
        token: 'daodiseo19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l' as CW20Addr,
      },
    ],
    overseer: 'daodiseo1qljxd0y3j3gk97025qvl3lgq8ygup4gsksvaxv' as HumanAddr,
    oracle: 'daodiseo1p4gg3p2ue6qy2qfuxtrmgv2ec3f4jmgqtazum8' as HumanAddr,
    interestModel: 'daodiseo1m25aqupscdw2kw4tnq5ql6hexgr34mr76azh5x' as HumanAddr,
    distributionModel:
      'daodiseo1u64cezah94sq3ye8y0ung28x3pxc37tv8fth7h' as HumanAddr,
  },
  liquidation: {
    liquidationContract:
      'daodiseo16vc4v9hhntswzkuunqhncs9yy30mqql3gxlqfe' as HumanAddr,
  },
  anchorToken: {
    gov: 'daodiseo16ckeuu7c6ggu52a8se005mg5c0kd2kmuun63cu' as HumanAddr,
    staking: 'daodiseo19nxz35c8f7t3ghdxrxherym20tux8eccar0c3k' as HumanAddr,
    community: 'daodiseo17g577z0pqt6tejhceh06y3lyeudfs3v90mzduy' as HumanAddr,
    distributor: 'daodiseo1z7nxemcnm8kp7fs33cs7ge4wfuld307v80gypj' as HumanAddr,
    investorLock: 'not available in testnet' as HumanAddr,
    teamLock: 'not available in testnet' as HumanAddr,
    collector: 'daodiseo1hlctcrrhcl2azxzcsns467le876cfuzam6jty4' as HumanAddr,
  },
  daodiseoswap: {
    factory: 'daodiseo18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf' as HumanAddr,
    blunaLunaPair: 'daodiseo13e4jmcjnwrauvl2fnjdwex0exuzd8zrh5xk29v' as HumanAddr,
    ancUstPair: 'daodiseo1wfvczps2865j0awnurk9m04u7wdmd6qv3fdnvz' as HumanAddr,
  },
  astroport: {
    generator: 'daodiseo1gjm7d9nmewn27qzrvqyhda8zsfl40aya7tvaw5' as HumanAddr,
  },
  cw20: {
    bLuna: 'daodiseo1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x' as CW20Addr,
    bEth: 'daodiseo19mkj9nec6e3y5754tlnuz4vem7lzh4n0lc2s3l' as CW20Addr,
    aUST: 'daodiseo1ajt556dpzvjwl0kl5tzku3fc3p3knkg9mkv8jl' as CW20Addr,
    ANC: 'daodiseo1747mad58h0w4y589y3sk84r5efqdev9q4r02pc' as CW20Addr,
    AncUstLP: 'daodiseo1agu2qllktlmf0jdkuhcheqtchnkppzrl4759y6' as CW20Addr,
    bLunaLunaLP: 'daodiseo1tj4pavqjqjfm0wh73sh7yy9m4uq3m2cpmgva6n' as CW20Addr,
  },
};

export const TEST_WALLET_ADDRESS =
  'daodiseo12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9' as HumanAddr;
