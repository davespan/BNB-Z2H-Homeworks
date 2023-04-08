async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const ShameCoin = await ethers.getContractFactory("ShameCoin");
  const shameCoin = await ShameCoin.deploy();

  console.log("ShameCoin address:", badgerCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });