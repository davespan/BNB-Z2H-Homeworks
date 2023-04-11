const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const UpgradeMe = await ethers.getContractFactory("UpgradeMe");
  const instance = await upgrades.deployProxy(UpgradeMe, [deployer.address]);
  await instance.deployed();

  const UpgradeMeV2 = await ethers.getContractFactory("UpgradeMeV2");
  const upgraded = await upgrades.upgradeProxy(instance.address, UpgradeMeV2);
}

main();