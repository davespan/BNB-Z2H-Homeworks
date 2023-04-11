# Homework 10

Go back to [Week 3](/Week%203/week-3-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

For the DogCoin contract you created:

1. Add an internal function called `_mint` to increase the total supply, any increase in supply should be given to the contract owner.

>You can find the project [here](/Week%203/Day%202/DogCoin/).
>
>**DogCoin.sol**

```solidity
<SNIP>

    function mint() public onlyOwner {
        _mint();
    }

    function _mint() internal onlyOwner {
        increaseTotalSupply();
        balances[owner] += incrementStep;
    }

<SNIP>
```

2. Add some unit tests to test the following:
    - The total supply can be increased in steps of 1000.
    - Only the owner can increase the total supply.
    - The correct events are produced when transfers occur.

>**DogCoin.js**

```javascript
const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("DogCoin contract", function () {
  async function deployTokenFixture() {
    const Token = await ethers.getContractFactory("DogCoin");
    const [owner, addr1] = await ethers.getSigners();

    const increasedSupply = 2001000;
    const balanceIncrease = 2001000;

    const hardhatToken = await Token.deploy();

    await hardhatToken.deployed();

    return { Token, hardhatToken, increasedSupply, balanceIncrease, owner, addr1 };
  }

  describe("Minting", function () {
    it("The total supply should increase by 1000 when calling mint()", async function () {
      const { hardhatToken, increasedSupply } = await loadFixture(deployTokenFixture);
      await hardhatToken.mint();
      expect(await hardhatToken.getTotalSupply()).to.equal(increasedSupply);
    });

    it("The owner's balance should increase by 1000 when calling mint()", async function () {
      const { hardhatToken, balanceIncrease, owner } = await loadFixture(deployTokenFixture);
      await hardhatToken.mint();
      expect(await hardhatToken.balances(owner.address)).to.equal(balanceIncrease);
    });

    it("Should fail if sender is not owner", async function () {
      const { hardhatToken, addr1 } = await loadFixture(deployTokenFixture);
      await expect (hardhatToken.connect(addr1).mint())
        .to.be.revertedWith("Only owner can call this function.");
    });
  });

  describe("Transactions", function () {
    it("Should emit Transfer events", async function () {
        const { hardhatToken, addr1 } = await loadFixture(deployTokenFixture);
        await expect(hardhatToken.transfer(50, addr1.address))
          .to.emit(hardhatToken, "Transferred")
          .withArgs(50, addr1.address);
    });
  });
});
```

Back to [top](#homework-10)