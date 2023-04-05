const { ethers } = require("hardhat");

async function main() {
  const contractAbi = require('../contracts/PancakeRouter.json');
  const contractAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
  const contract = await ethers.getContractAt(contractAbi, contractAddress);

  const result = await contract.factory();

  console.log(result);
}

main();