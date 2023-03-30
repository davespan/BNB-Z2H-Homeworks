const { expect } = require("chai");

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("BadgerNFT contract", function () {
  async function deployTokenFixture() {
    const BadgerNFT = await ethers.getContractFactory("BadgerNFT");
    const [owner] = await ethers.getSigners();

    const uri = "bafybeib4ccvdagjeoc526yz47qatwkydxz3re3r5m5jxernscijudsdzo4";

    const badgerNFT = await BadgerNFT.deploy();

    await badgerNFT.deployed();

    return { badgerNFT, owner, uri };
  }

  describe("Minting", function () {
    it("Should mint an NFT to the owner", async function () {
      const { badgerNFT, owner, uri } = await loadFixture(
        deployTokenFixture
      );
      await badgerNFT.safeMint(owner.address, uri);
      expect(await badgerNFT.balanceOf(owner.address)).to.equal(1);
    });
  });
});