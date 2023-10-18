
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// // Uncomment this line to use console.log
import "hardhat/console.sol";

contract SimpleTransfer {
    function transfer(address payable _to, uint256 amount) external payable {
        console.log("[TEST 1]", amount);
        require(amount > 0, "Amount must be greater than 0");
        console.log("[TEST 2]", address(msg.sender).balance);
        console.log("[TEST 4]", address(this).balance);
        
        // Ensure the sender has enough balance to perform the transfer
        require(address(msg.sender).balance >= amount, "Insufficient balance for the transfer");

        // Transfer Ether from the sender to the recipient
        _to.transfer(amount);
    }
}
