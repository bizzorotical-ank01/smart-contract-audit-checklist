// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AccessControlFixed is Ownable {

    constructor() Ownable(msg.sender) {}

    function mint(address to, uint256 amount) public onlyOwner {
        // secure mint logic
    }

    function changeOwner(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    }
}