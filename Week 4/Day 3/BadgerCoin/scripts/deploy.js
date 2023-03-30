async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const BadgerCoin = await ethers.getContractFactory("BadgerCoin");
  const badgerCoin = await BadgerCoin.deploy();

  console.log("BadgerCoin address:", badgerCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });