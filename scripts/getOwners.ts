import { ethers } from "hardhat";
import { SimpleTransfer } from "../typechain-types/SimpleTransfer"

async function main() {
    let simpleTransfer: SimpleTransfer;

    simpleTransfer = await ethers.getContractAt("SimpleTransfer", process.env.contract as string);
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
