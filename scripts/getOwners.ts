import { ethers } from "hardhat";
import { LavaEvmosIpRPCDistribution } from "../typechain-types/LavaEvmosIpRPCDistribution"

async function main() {
    let simpleTransfer: LavaEvmosIpRPCDistribution;

    simpleTransfer = await ethers.getContractAt("LavaEvmosIpRPCDistribution", process.env.contract as string);
    simpleTransfer.getOwner().then((owner) => {
        console.log("getOwner", owner)
    })

    simpleTransfer.getBackupOwner().then((backupOwner) => {
        console.log("getBackupOwner", backupOwner)
    })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
