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
  }
};

export default config;