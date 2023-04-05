require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

const { provider } = require('./secrets.json');

module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: provider,
      },
      chainId: 56,
    },
  },
  solidity: "0.8.18",
};