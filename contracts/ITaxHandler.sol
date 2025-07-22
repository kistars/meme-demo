// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITaxHandler {
    function getTax(uint256 amount) external returns (uint256);
}
