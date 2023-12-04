import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { LavaAxelarIpRPCDistribution, IERC20 } from "../typechain-types"


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
        


    });
});
