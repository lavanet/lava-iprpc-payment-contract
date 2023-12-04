import { ethers } from "hardhat";

async function main() {
  const lockedAmount = ethers.parseEther("0"); // Update to your desired value

  const lock = await ethers.deployContract("LavaEvmosIpRPCDistribution", {
    value: lockedAmount,
  });

  await lock.waitForDeployment();

  console.log(
    `Lock with ${ethers.formatEther(
      lockedAmount
    )} ETH deployed to ${await lock.getAddress()}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
