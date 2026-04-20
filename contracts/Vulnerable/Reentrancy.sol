// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract ReentrancyVulnerable {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];

        require(amount > 0, "No funds");

        // ❌ Vulnerability here
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Failed");

        balances[msg.sender] = 0;
    }
}