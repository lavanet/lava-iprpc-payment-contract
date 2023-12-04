import { ethers } from "hardhat";

async function main() {
  const tokenAddress = "0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f"; // Wrapped Axelar token address (both testnet and mainnet), decimal 6!

  const lock = await ethers.deployContract("LavaAxelarIpRPCDistribution", [tokenAddress]);

  await lock.waitForDeployment();

  console.log(
    `Lock deployed to ${await lock.getAddress()} with token address ${tokenAddress}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});