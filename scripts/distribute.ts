import { ethers } from "hardhat";
import { LavaEvmosIpRPCDistribution } from "../typechain-types/LavaEvmosIpRPCDistribution"

async function main() {
    let simpleTransfer: LavaEvmosIpRPCDistribution;
    let contractAddress = await ethers.getAddress(process.env.contract as string)
    let providerAddress = await ethers.getAddress(process.env.provider as string)

    const signer = await ethers.provider.getSigner();
    console.log(signer.address)
    simpleTransfer = await ethers.getContractAt("LavaEvmosIpRPCDistribution", contractAddress as string);
    
    let contractBalance = 0n;
    await ethers.provider.getBalance(contractAddress).then((balance) => {
        console.log("contractAddress balance", contractAddress, balance)
        contractBalance = balance;
    });
    await ethers.provider.getBalance(providerAddress).then((balance) => {
        console.log("providerAddress balance", providerAddress, balance)
    });

    

    console.log("distribute to", providerAddress, contractBalance)
    /*await simpleTransfer.payProviders([
        {
            name: providerAddress,
            value: contractBalance,
        }
    ]).then(async (tx) => {
        console.log(tx)
        await tx.wait();
    })*/

    
    await ethers.provider.getBalance(contractAddress).then((balance) => {
        console.log("contractAddress balance", contractAddress, balance)
    });
    await ethers.provider.getBalance(providerAddress).then((balance) => {
        console.log("providerAddress balance", providerAddress, balance)
    });


}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
