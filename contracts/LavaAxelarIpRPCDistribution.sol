// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Import ERC-20 token interface
interface ERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract LavaAxelarIpRPCDistribution {
    address public owner;
    address public backupOwner;
    address public tokenAddress; // Address of the ERC-20 token contract
    ERC20 public token; // ERC-20 token instance

    constructor(address _tokenAddress) {
        owner = msg.sender;
        backupOwner = msg.sender;
        tokenAddress = _tokenAddress;
        token = ERC20(_tokenAddress); // Initialize the token instance
    }

    function payProviders(Provider[] memory providers) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        for (uint256 i = 0; i < providers.length; i++) {
            address providerAddress = providers[i].name;
            uint256 amount = providers[i].value;

            // Assuming the token follows ERC-20 standard transfer function
            require(token.transfer(providerAddress, amount), "Token transfer failed");
        }
    }

     // Update token address
    function updateTokenAddress(address _newTokenAddress) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        tokenAddress = _newTokenAddress;
        token = ERC20(_newTokenAddress); // Update token instance
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
    
    struct Provider {
        address name;
        uint256 value;
    }
}
