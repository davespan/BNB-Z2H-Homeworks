# Homework 19

Go back to [Week 5](/Week%205/week-5-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Write a **ShameCoin** contract:
1. The **ShameCoin** needs to have an administrator address that is set in the constructor.
2. The decimal places should be set to 0.
3. The administrator can send 1 **ShameCoin** at a time to other addresses (but keep the `transfer` function signature the same).
4. If non administrators try to transfer their **ShameCoin**, the transfer function will instead increase their balance by one.
5. Non administrators can approve the administrator (and only the administrator) to spend one token on their behalf.
6. The `transferFrom` function should just reduce the balance of the holder.
7. Write unit tests to show that the functionality is correct.
8. Document the contract with [Natspec](https://docs.soliditylang.org/en/v0.8.17/natspec-format.html), and produce docs from this.
>You can find the project [here](/Week%205/Day%204/ShameCoin/).
>
>**ShameCoin.sol**

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

/**
* @title ShameCoin token
* @author dasp
*/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShameCoin is ERC20, Ownable {
    constructor() ERC20("ShameCoin", "SHM") {}

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    /**
    * @notice Transfers one ShameCoin to the recipient. Can only be executed if the amount is 1.
    * @param recipient The address of the recipient of the transfer.
    * @param amount The amount of ShameCoin to be transferred.
    * @return bool indicating whether the transfer was successful.
    */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount == 1, "You can only transfer 1 ShameCoin at a time.");
        if (msg.sender == owner()) {
            _mint(msg.sender, 1);
            return super.transfer(recipient, amount);
        } else {
            require(balanceOf(msg.sender) > 0, "Transfer amount exceeds balance");
            _mint(msg.sender, 1);
            return true;
        }
    }

    /**
    * @notice Approves the spender to transfer one ShameCoin. Can only be executed if the amount is 1 and the spender is the owner.
    * @param spender The address of the spender to be approved.
    * @param amount The amount of ShameCoin to be approved.
    * @return bool indicating whether the approval was successful or not.
    */
    function approve(address spender, uint256 amount) public override returns (bool) {
        require(amount == 1, "You can only approve 1 ShameCoin at a time.");
        require(spender == owner(), "Only admin can be approved.");
        return super.approve(spender, 1);
    }

    /**
    * @notice Burns one ShameCoin from the sender. Can only be executed if the amount is 1 and the sender is the owner.
    * @param sender The address of the sender of the burn
    * @param recipient The address of the recipient of the burn
    * @param amount The amount of ShameCoin to be burned
    * @return bool indicating whether the burn was successful or not.
    */
    function transferFrom(address sender, address recipient, uint256 amount) public override onlyOwner returns (bool) {
        require(amount == 1, "You can only burn 1 ShameCoin at a time.");
            _burn(sender, amount);
            return true;
    }
}
```

>**ShameCoin.js**

```javascript
const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("ShameCoin contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("ShameCoin");
    const [owner, addr1, addr2] = await ethers.getSigners();

    const decimals = 0;

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return { Token, hardhatToken, decimals, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("The number of decimals should be 0", async function () {
      const { hardhatToken, decimals } = await loadFixture(deployTokenFixture);
      expect(await hardhatToken.decimals()).to.equal(decimals);
    });
  });

  describe("Transactions", function () {
    it("Admin should transfer 1 ShameCoin to account", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      expect(
        await hardhatToken.transfer(addr1.address, 1)
      ).to.changeTokenBalances(hardhatToken, [owner, addr1], [-1, 1]);
    });

    it("Should increase sender's ShameCoin balance if sender is not admin", async function () {
      const { hardhatToken, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      await hardhatToken.transfer(addr1.address, 1);

      await expect(
        hardhatToken.connect(addr1).transfer(addr2.address, 1)
      ).to.changeTokenBalances(hardhatToken, [addr1, addr2], [+1, 0]);
    });

    it("Admin should burn account's ShameCoin", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      await hardhatToken.transfer(addr1.address, 1);
      await hardhatToken.approve(owner.address, 1);

      await expect(
        hardhatToken.transferFrom(addr1.address, owner.address, 1)
      ).to.changeTokenBalances(hardhatToken, [addr1, owner], [-1, 0]);
    });

    it("Should fail if sender doesn't have enough ShameCoins", async function () {
      const { hardhatToken, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      const initialOwnerBalance = await hardhatToken.balanceOf(addr1.address);

      await expect(
        hardhatToken.connect(addr2).transfer(addr1.address, 1)
      ).to.be.revertedWith("Transfer amount exceeds balance");

      expect(await hardhatToken.balanceOf(addr1.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});
```

>Generating the docs using `hardhat-docgen`:

```bash
$ npx hardhat docgen
<SNIP>
$ ls docs 
index.html              main.js                 main.js.LICENSE.txt 
```

Back to [top](#homework-19)