import { ethers } from "hardhat";

async function main() {
  const tokenAddress = "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d"; // Wrapped Near token address (both testnet and mainnet), decimal 24!

  const lock = await ethers.deployContract("LavaNearIpRPCDistribution", [tokenAddress]);

  await lock.waitForDeployment();

  console.log(
    `Lock deployed to ${await lock.getAddress()} with token address ${tokenAddress}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});