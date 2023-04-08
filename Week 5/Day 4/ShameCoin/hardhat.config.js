require("@nomicfoundation/hardhat-toolbox");
require('hardhat-docgen');

module.exports = {
  solidity: "0.8.9",
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: true,
  }
};
