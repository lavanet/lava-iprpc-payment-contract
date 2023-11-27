// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol"; // Import console.sol for debugging

contract LavaEvmosProviderPaymentContract {
    address public owner;
    address public backupOwner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
        backupOwner = address(0);
    }

    function payProviders(Provider[] memory providers) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        uint256 totalAmount = 0;
        uint256 balanceAtStart = address(this).balance;
        for (uint256 i = 0; i < providers.length; i++) {
            address payable providerAddress = payable(providers[i].name);
            uint256 amount = providers[i].value;
            totalAmount += amount;
            providerAddress.transfer(amount);
            balances[providerAddress] += amount;
            // Use console.log for debugging
            console.log("Transferred", amount, "to", providerAddress);
        }
        require(balanceAtStart >= totalAmount, "Insufficient balance in the contract");
        console.log("Balance left in contract:", address(this).balance);
    }

    function setOwner(address newOwner) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        owner = newOwner;
    }

    function setBackUpOwner(address newBackupOwner) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        backupOwner = newBackupOwner;
    }

    receive() external payable {
        // Allow anyone to add funds to the contract
        require(msg.value > 0, "Value must be greater than 0");
        // Log the contract's address and balance
        console.log("Received", msg.value, "Wei from", msg.sender);
        console.log("Contract Address:", address(this));
        console.log("Contract Total Balance:", address(this).balance);
    }

    struct Provider {
        address name;
        uint256 value;
    }
}
