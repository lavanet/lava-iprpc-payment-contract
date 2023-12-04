// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract LavaEvmosIpRPCDistribution {
    address public owner;
    address public backupOwner;

    constructor() {
        owner = msg.sender;
        backupOwner = msg.sender;
    }

    function payProviders(Provider[] memory providers) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        for (uint256 i = 0; i < providers.length; i++) {
            address payable providerAddress = payable(providers[i].name);
            uint256 amount = providers[i].value;
            providerAddress.transfer(amount);
        }
    }

    function setOwner(address newOwner) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        owner = newOwner;
    }

    function setBackUpOwner(address newBackupOwner) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        backupOwner = newBackupOwner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function getBackupOwner() public view returns (address) {
        return backupOwner;
    }
    
    receive() external payable {
        // Allow anyone to add funds to the contract
    }

    struct Provider {
        address name;
        uint256 value;
    }
}
