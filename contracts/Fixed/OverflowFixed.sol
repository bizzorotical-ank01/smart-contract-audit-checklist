// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract OverflowFixed {
    uint256 public total;

    function add(uint256 value) public {
        total += value; // ✅ safe (auto revert on overflow)
    }
}