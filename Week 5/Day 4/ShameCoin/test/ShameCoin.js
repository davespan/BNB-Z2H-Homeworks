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