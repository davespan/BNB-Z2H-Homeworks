async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const BadgerNFT = await ethers.getContractFactory("BadgerNFT");
  const badgerNFT = await BadgerNFT.deploy();

  console.log("BadgerNFT address:", badgerNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });