import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    evmost: {
      url: `https://evmos-testnet.lava.build`,
      //accounts: [`<EVMOS-ACCOUNT-PRIVATE-KEY-HERE>`],
    },
    evmos: {
      url: `https://evmos.lava.build`,
      //accounts: [`<EVMOS-ACCOUNT-PRIVATE-KEY-HERE>`],
    },
    arbitrumt: {
      url: `https://endpoints.omniatech.io/v1/arbitrum/goerli/public`,
      //accounts: [`<ARB-GOERLI-ACCOUNT-PRIVATE-KEY-HERE>`],
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      //accounts: [`<ARB-ONE-ACCOUNT-PRIVATE-KEY-HERE>`],
    },
  }
};

export default config;