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