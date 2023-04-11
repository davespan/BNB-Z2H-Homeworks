# Homework 15

Go back to [Week 4](/Week%204/week-4-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Using the Badger Coin you created in previous homeworks:
1. Make sure that the `approve` and `transferFrom` functions are implemented.
>**Answer**: The BadgerCoin contract inherits those functions from the OpenZeppelin [ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.8.2/contracts/token/ERC20/ERC20.sol) contract.
2. Add pausable functionality; you can use the OpenZeppelin Pausable contract.
>You can find the project [here](/Week%204/Day%203/BadgerCoin/).
>
>**BadgerCoin.sol**

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BadgerCoin is ERC20, Pausable, Ownable {
    constructor() ERC20("BadgerCoin", "BC") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
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
3. Write unit tests to test the above functionality.
>**BadgerCoin.js**

```javascript
const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("BadgerCoin contract", function () {
  async function deployTokenFixture() {
    const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const badgerCoin = await BadgerCoin.deploy();

    await badgerCoin.deployed();

    return { badgerCoin, owner, addr1, addr2 };
  }

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const { badgerCoin, owner, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      await badgerCoin.approve(owner.address, 50);
      expect(
        await badgerCoin.transferFrom(owner.address, addr1.address, 50)
      ).to.changeTokenBalances(badgerCoin, [owner, addr1], [-50, 50]);
      
      await badgerCoin.approve(addr1.address, 50);
      expect(
        await badgerCoin.connect(addr1).transferFrom(owner.address, addr2.address, 50)
      ).to.changeTokenBalances(badgerCoin, [addr1, addr2], [-50, 50]);
    });
  });

  describe("Pausability", function () {
    it("Should be paused prevent transfers", async function () {
      const { badgerCoin, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      await badgerCoin.approve(owner.address, 50);
      await badgerCoin.pause();
      await expect(
        badgerCoin.transferFrom(owner.address, addr1.address, 50)
      ).to.be.revertedWith("Pausable: paused");
    });
  
    it("Should be unpaused and allow transfers", async function () {
      const { badgerCoin, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      await badgerCoin.approve(owner.address, 50);
      await badgerCoin.pause();
      await badgerCoin.unpause();
      await expect(
        badgerCoin.transferFrom(owner.address, addr1.address, 50)
      ).to.not.be.reverted;
    });
  });
});
```

4. Deploy you new contract onto the test network.
> Deploying the contract to the Bsc Testnet:

```bash
$ npx hardhat compile                                
Compiled 7 Solidity files successfully
$ npx hardhat run --network testnet scripts/deploy.js
Deploying contracts with the account: 0x8ADF03D76F422e9D65AC63Ca98f5F7092D21a954
BadgerCoin address: 0x8d92EEb3f796E8c55682ed171Ae60388B6b7E7c4
```

> Verifying the contract:

```bash
$ npx hardhat verify --network testnet 0x8d92EEb3f796E8c55682ed171Ae60388B6b7E7c4
Compiled 7 Solidity files successfully
Successfully submitted source code for contract
contracts/BadgerCoin.sol:BadgerCoin at 0x8d92EEb3f796E8c55682ed171Ae60388B6b7E7c4
for verification on the block explorer. Waiting for verification result...

Successfully verified contract BadgerCoin on Etherscan.
https://testnet.bscscan.com/address/0x8d92EEb3f796E8c55682ed171Ae60388B6b7E7c4#code
```

>**Note**: Remove any unnecessary contracts and clear the artifacts otherwise these will also be part of the verified contract.

Back to [top](#homework-15)