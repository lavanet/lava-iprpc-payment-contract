pragma solidity ^0.8.9;
// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract LavaAxelarIpRPCDistribution {
    using SafeERC20 for IERC20;
    address public owner;
    address public backupOwner;
    address public tokenAddress; // Address of the ERC-20 token contract
    IERC20 public token; // ERC-20 token instance

    constructor(address _tokenAddress) {
        owner = msg.sender;
        backupOwner = msg.sender;
        tokenAddress = _tokenAddress;
        token = IERC20(_tokenAddress); // Initialize the token instance
    }

    function payProviders(Provider[] memory providers) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        for (uint256 i = 0; i < providers.length; i++) {
            address providerAddress = providers[i].name;
            uint256 amount = providers[i].value;
            // Assuming the token follows ERC-20 standard transfer function
            token.safeTransferFrom(msg.sender, providerAddress, amount);
        }
    }

     // Update token address
    function updateTokenAddress(address _newTokenAddress) public {
        require(msg.sender == owner || msg.sender == backupOwner, "Only the owner / backup can call this function");
        tokenAddress = _newTokenAddress;
        token = IERC20(_newTokenAddress); // Update token instance
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
