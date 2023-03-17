// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BadgerCoin is ERC20, Ownable {
    constructor() ERC20("BadgerCoin", "BC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    /**
    * Returns the bep20 token owner which is necessary for binding with bep2 token.
    * NOTE: This is an extended method of EIP20. Tokens which don’t implement this 
    * method will never flow across the BNB Beacon Chain and BNB Smart Chain. 
    */
    function getOwner() external view returns (address) {
        // The owner() function is provided by the Ownable contract.
        return owner();
    }
}