# Homework 5

## Solutions

- [Badger Coin Contract](#badger-coin-contract)
- [Verification](#verification)

Go back to [Week 2](/Week%202/week-2-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Badger Coin Contract

Create a `BEP20` contract with the following details:
- **Name** : "BadgerCoin"
- **Symbol** : "BC"
- **Decimals** : 18
- **Initial supply** : 1000000 tokens
- Deploy this to a test network. You may inherit from [Open Zeppelin contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/v4.8.2/contracts).

**BadgeCoin.sol**

```sol
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
```

Back to [top](#solutions)

---

## Verification

1. Take one of the contracts you created in the previous homework and
deploy it to BSC test net.
2. Find your deployed contract on the block explorer.
>**Answer**: [Contract on the testnet](https://testnet.bscscan.com/address/0xd07a57c5fd3e8286b13960eac2514be8c44230ba).
3. Verify your contract, using verify and publish.
4. Interact with your contract using the 'Read Contract' and 'Write
Contract' tabs.
>**Answer**: [Code](https://testnet.bscscan.com/address/0xd07a57c5fd3e8286b13960eac2514be8c44230ba#code), [Read Contract](https://testnet.bscscan.com/address/0xd07a57c5fd3e8286b13960eac2514be8c44230ba#readContract), [Write Contract](https://testnet.bscscan.com/address/0xd07a57c5fd3e8286b13960eac2514be8c44230ba#writeContract).

Back to [top](#solutions)