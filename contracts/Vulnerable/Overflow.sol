// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OverflowVulnerable {
    uint256 public total;

    function add(uint256 value) public {
        unchecked {
            total += value;
        }
    }
}