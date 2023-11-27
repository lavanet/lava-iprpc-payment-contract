import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    evmost: {
      url: `https://g.w.lavanet.xyz:443/gateway/evmost/json-rpc-http/9dbe4f2c6a0baba4cd27acb8ef3d7499`,
      accounts: [`3e006c517bb029f3ede0ce883ce0cfa1ab8f8d8da5229b4a8ff5b91f4ccdf414`],
    },
    arbitrumGoerli: {
      url: `https://arbitrum-goerli.publicnode.com`,
      accounts: [`ad6b03d6ac2770b3b7457effb39e564e2a4b299304f1ece47da1542e5f0ca013`],
    },
    // Add more network configurations as needed
  },
};

export default config;
