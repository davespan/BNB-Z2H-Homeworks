# Homework 16

Go back to [Week 5](/Week%205/week-5-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

1. Set up an account on [Quick Node](https://www.quicknode.com/) so that you have access to an archive node.
2. Follow the instructions from the lesson to create a local fork of Mainnet.
>**hardhat.config.js**

```javascript
const { provider } = require('./secrets.json');

module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: provider,
      },
      chainID: 56,
    },
  },
  solidity: "0.8.18",
};
```

> Booting our Archive Node:

```bash
$ npx hardhat node
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
<SNIP>
```

3. Check that the block height and the chain ID is what you expect.
> **Block height** and **chainId** are as expected.
>
>Querying the Forked Chain for the **block height**:

```bash
$ curl --data '{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 
{"jsonrpc":"2.0","id":1,"result":"0x19cc7d9"}%
```
>Converting the **block number** from Hexadecimal to Decimal:

```bash
$ echo $((16#19cc7d9))
27051993
```

>Querying the Forked Chain for the **chainId**:

```bash
$ curl --data '{"method":"eth_chainId","params":[],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x38"}%
```

>Converting the **chainId** from Hexadecimal to Decimal:

```bash
$ echo $((16#38))  
56
```

4. Connect to your local fork and use the contract details for Pancake Swap, make a call to the `factory` function to get the address of the factory contract, check this by reading the same function on BscScan.
>**factory-address.js**
```javascript
const { ethers } = require("hardhat");

async function main() {
  const contractAbi = require('../contracts/PancakeRouter.json');
  const contractAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
  const contract = await ethers.getContractAt(contractAbi, contractAddress);

  const result = await contract.factory();

  console.log(result);
}

main();
```
>The address we get is the same read on BscScan:

```bash
$ npx hardhat run scripts/factory-address.js
0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73
```

5. Write some unit tests, as if you were testing the various contracts. Your tests should test:
    - Interaction with the pair contract for **LEGO** and **BUSD**; what are the reserves and when were they updated?
    - Impersonation of an address such as this one : `0xffefE959d8bAEA028b1697ABfc4285028d6CEB10`
    to obtain some **LEGO**.
    - Interaction with the router contract to swap some **LEGO** for **BUSD**
    by using the `swapExactTokensForTokens` function.
>TODO

Back to [top](#homework-16)