import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { LavaEvmosIpRPCDistribution } from "../typechain-types"


describe("LavaEvmosIpRPCDistribution", function () {
    let owner: HardhatEthersSigner;
    let recipient: HardhatEthersSigner;
    let recipient2: HardhatEthersSigner;
    let simpleTransfer: LavaEvmosIpRPCDistribution;

    before(async function () {
        [owner, recipient, recipient2] = await ethers.getSigners();
        const SimpleTransferFactory = await ethers.getContractFactory("LavaEvmosIpRPCDistribution");
        simpleTransfer = await SimpleTransferFactory.deploy();
    });

    it("Simple flow 2 accounts", async function () {
        const ownerBalanceBefore = await ethers.provider.getBalance(owner.address);
        const initialRecipientBalance = await ethers.provider.getBalance(recipient.address);
        const initialRecipient2Balance = await ethers.provider.getBalance(recipient2.address);

        simpleTransfer.getOwner().then((tOwner) => {
            expect(tOwner).to.equal(owner.address)
        })
        simpleTransfer.getBackupOwner().then((tBackupOwner) => {
            expect(tBackupOwner).to.equal(owner.address)
        })

        const amount = ethers.parseEther("1");

        // Send some Ether to the owner to fund the contract
        const fundTransaction = await owner.sendTransaction({
            to: await simpleTransfer.getAddress(),
            value: amount * (3n), // Make sure the contract has enough balance
        });

        await fundTransaction.wait();

        // Get the contract's balance before the transfer
        const contractBalanceBefore = await ethers.provider.getBalance(await simpleTransfer.getAddress());

        // Transfer funds from the contract to the recipient
        const transferTransaction = await simpleTransfer.connect(owner).payProviders(
            [
                {
                    name: recipient.address,
                    value: amount,
                },
                {
                    name: recipient2.address,
                    value: amount,
                },
            ]
        );

        await transferTransaction.wait();

        const finalRecipientBalance = await ethers.provider.getBalance(recipient.address);
        const finalRecipient2Balance = await ethers.provider.getBalance(recipient2.address);
        const contractBalanceAfter = await ethers.provider.getBalance(await simpleTransfer.getAddress());
        const ownerBalanceAfter = await ethers.provider.getBalance(owner.address);
        console.log("initialRecipientBalance ", initialRecipientBalance)
        console.log("initialRecipient2Balance", initialRecipient2Balance)
        console.log("finalRecipientBalance   ", finalRecipientBalance)
        console.log("finalRecipient2Balance  ", finalRecipient2Balance)
        console.log("contractBalanceBefore   ", contractBalanceBefore)
        console.log("contractBalanceAfter    ", contractBalanceAfter)
        console.log("ownerBalanceBefore      ", ownerBalanceBefore)
        console.log("ownerBalanceAfter       ", ownerBalanceAfter)

        expect(contractBalanceBefore - (amount * 2n)).to.equal(contractBalanceAfter); // Contract balance should decrease
        expect(finalRecipientBalance - (amount)).to.equal(initialRecipientBalance); // Recipient should receive the transferred amount
        expect(finalRecipient2Balance - (amount)).to.equal(initialRecipient2Balance); // Recipient2 should receive the transferred amount
    });

    it("Test many accounts", async function () {
        const providerReceivers = (await ethers.getSigners()).slice(3, 21); // get only accounts that didn't have money before.
        console.log("Testing ", providerReceivers.length, "accounts")
        const owner = (await ethers.getSigners())[0];
        const payAmount = ethers.parseEther("1");

        // Get providers
        const paymentListOfProviders: LavaEvmosIpRPCDistribution.ProviderStruct[] = [];
        let totalBalanceBefore = 0n;
        for (let address of providerReceivers) {
            const balanceBefore = await ethers.provider.getBalance(address.address);
            totalBalanceBefore += balanceBefore;
            paymentListOfProviders.push({
                name: await address.address,
                value: payAmount,
            })
        }

        // Fail Transferring funds due to not enough balance
        let exceptionHappened: boolean = false;
        try {
            const transferTransaction = await simpleTransfer.connect(owner).payProviders(
                paymentListOfProviders
            );
            await transferTransaction.wait();
        } catch (e) {
            exceptionHappened = true
            expect(String(e)).to.equal("Error: Transaction reverted: function call failed to execute")

            let totalBalanceAfter = 0n;
            for (let address of providerReceivers) {
                const balanceAfter = await ethers.provider.getBalance(address.address)
                totalBalanceAfter += balanceAfter
                console.log("balance after ", balanceAfter);
            }
            expect(totalBalanceAfter).to.equal(totalBalanceBefore)
        }
        expect(exceptionHappened).to.equal(true)

        // Fund the contract
        const fundTransaction = await owner.sendTransaction({
            to: await simpleTransfer.getAddress(),
            value: payAmount * (BigInt(providerReceivers.length)), // Make sure the contract has enough balance
        });
        await fundTransaction.wait();

        // Transfer funds from the contract to the recipient
        const transferTransaction2 = await simpleTransfer.connect(owner).payProviders(
            paymentListOfProviders
        );
        await transferTransaction2.wait();

        let totalBalanceAfter = 0n;
        for (let address of providerReceivers) {
            const balanceAfter = await ethers.provider.getBalance(address.address)
            totalBalanceAfter += balanceAfter
            console.log("balance after ", balanceAfter);
        }
        expect(totalBalanceAfter).to.equal(totalBalanceBefore + BigInt(providerReceivers.length) * payAmount)

    });

    it("Fund the contract with a different address", async function () {
        const providerReceivers = (await ethers.getSigners()).slice(3, 21); // get only accounts that didn't have money before.
        console.log("Testing ", providerReceivers.length, "accounts")
        const owner = (await ethers.getSigners())[0];
        const payAmount = ethers.parseEther("1");
        const recipientBalanceAtFirst = await ethers.provider.getBalance(recipient.address);
        const ownerBalanceAtFirst = await ethers.provider.getBalance(owner.address);
        const fundTransaction = await recipient.sendTransaction({ // let the recipient (in this test this is some random address) pay
            to: await simpleTransfer.getAddress(),
            value: payAmount * (BigInt(providerReceivers.length)), // Make sure the contract has enough balance
        });
        await fundTransaction.wait();
        const paymentListOfProviders: LavaEvmosIpRPCDistribution.ProviderStruct[] = [];
        // providersInput : LavaEvmosIpRPCDistribution.ProviderStruct[] = []
        for (let address of providerReceivers) {
            paymentListOfProviders.push({
                name: await address.address,
                value: payAmount,
            })
        }
        // Transfer funds from the contract to the recipient
        const transferTransaction = await simpleTransfer.connect(owner).payProviders(
            paymentListOfProviders
        );
        const result = await transferTransaction.wait();
        for (let address of providerReceivers) {
            console.log("balance after ", await ethers.provider.getBalance(address.address));
        }

        const gasUsed = result?.gasUsed;
        if (!gasUsed) {
            throw new Error("impossible to get here");
        }

        const ownerBalanceAtFinal = await ethers.provider.getBalance(owner.address);
        console.log(ownerBalanceAtFirst - ownerBalanceAtFinal)
        // expect the owners funds to remain the same (minus gas) as the account named recipient payed
        expect(ownerBalanceAtFinal + transferTransaction.gasPrice * gasUsed).to.equal(ownerBalanceAtFirst)
        expect(recipientBalanceAtFirst).to.above(await ethers.provider.getBalance(recipient.address))
    });

    it("test multiple owners", async function () {
        const amount = ethers.parseEther("1");
        const initialRecipient2Balance = await ethers.provider.getBalance(recipient2.address);
        const fundTransaction = await owner.sendTransaction({
            to: await simpleTransfer.getAddress(),
            value: amount * (3n), // Make sure the contract has enough balance
        });

        await fundTransaction.wait();
        await simpleTransfer.connect(owner).setBackUpOwner(recipient.address);
        await simpleTransfer.connect(recipient).payProviders([{
            name: recipient2.address,
            value: amount,
        }]);
        await simpleTransfer.connect(owner).payProviders([{
            name: recipient2.address,
            value: amount,
        }]);
        let exceptionHappened: boolean = false;
        try { // testing someone else cant launch the payment
            let randomUserTryingToSignTheTx = (await ethers.getSigners())[4]
            await simpleTransfer.connect(randomUserTryingToSignTheTx).payProviders([{
                name: recipient2.address,
                value: amount,
            }]);
        } catch (e) {
            exceptionHappened = true
            expect(String(e)).to.include("reverted with reason string 'Only the owner / backup can call this function'")
        }
        expect(exceptionHappened).to.equal(true)

        const finalRecipient2Balance = await ethers.provider.getBalance(recipient2.address);
        expect(finalRecipient2Balance).to.equal(initialRecipient2Balance + (amount * 2n))

        // now that we have 2 owners and tested they work lets remove one and see it still works
        await simpleTransfer.connect(owner).setBackUpOwner(owner.address);
        exceptionHappened = false
        try { // testing someone else cant launch the payment
            await simpleTransfer.connect(recipient).payProviders([{
                name: recipient2.address,
                value: amount,
            }]);
        } catch (e) {
            // expect the temporary owner to be removed. (recipient)
            exceptionHappened = true
            expect(String(e)).to.include("reverted with reason string 'Only the owner / backup can call this function'")
        }
        expect(exceptionHappened).to.equal(true)
    });

});
