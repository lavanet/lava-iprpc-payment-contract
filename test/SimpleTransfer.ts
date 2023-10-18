import { expect } from "chai";
import { ethers } from "hardhat";
import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Contract, ContractFactory, parseEther } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SimpleTransfer", function () {
    let owner: HardhatEthersSigner;
    let recipient: HardhatEthersSigner;

    async function setupBefore() {
        [owner, recipient] = await ethers.getSigners();
        const SimpleTransfer = await ethers.getContractFactory("SimpleTransfer");
        const simpleTransfer = await SimpleTransfer.deploy();
        return {simpleTransfer, owner, recipient};
    };

    it("Should transfer funds", async function () {
        const {simpleTransfer, owner, recipient} = await loadFixture(setupBefore);
        
        const initialBalance = await ethers.provider.getBalance(recipient.address);
        const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
        console.log("recipient initialBalance", initialBalance);
        console.log("ownerBalanceBefore      ", ownerBalanceBefore);
        const amount = parseEther("1");
        console.log("Amount out              ", amount)

        await owner.sendTransaction({
            to: owner.address,
        });
        await simpleTransfer.connect(owner).transfer(recipient.address, amount);

        const finalBalance = await ethers.provider.getBalance(recipient.address);
        const ownerFinalBalance = await ethers.provider.getBalance(owner.address);
        console.log("ownerFinalBalance", ownerFinalBalance)
        console.log("recipient finalBalance", finalBalance)
        // expect(finalBalance).to.equal(initialBalance.add(amount));
    });
});
