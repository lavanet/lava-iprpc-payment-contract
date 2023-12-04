import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ERC20 } from "../typechain-types/LavaAxelarIpRPCDistribution.sol/ERC20"; 
import { LavaAxelarIpRPCDistribution } from "../typechain-types/LavaAxelarIpRPCDistribution.sol/LavaAxelarIpRPCDistribution"


describe("LavaEvmosIpRPCDistribution", function () {
    let owner: HardhatEthersSigner;
    let recipient1: HardhatEthersSigner;
    let recipient2: HardhatEthersSigner;
    let simpleTransfer: LavaAxelarIpRPCDistribution;
    const tokenAddress = "0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f";
    before(async function () {
        [owner, recipient1, recipient2] = await ethers.getSigners();
        const SimpleTransferFactory = await ethers.getContractFactory("LavaAxelarIpRPCDistribution");
        simpleTransfer = await SimpleTransferFactory.deploy(tokenAddress);
    });

    it("Simple flow 2 accounts", async function () {
        const amountToSend1 = ethers.parseEther("10");
        const amountToSend2 = ethers.parseEther("5");
        await simpleTransfer.payProviders(
            [
                { name: await recipient1.getAddress(), value: amountToSend1 },
                { name: await recipient2.getAddress(), value: amountToSend2 },
            ]
        );


    });
});
