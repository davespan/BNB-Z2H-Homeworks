# Homework 3

Go back to [Week 1](/Week%201/week-1-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

After compiling the following contract:

```sol
// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

we can take a look at its **ABI** and **bytecode**.

## ABI

**ABI** stands for **A**pplication **B**inary **I**nterface, which is a standardized way to interact with smart contracts on the Ethereum blockchain. It defines how to call functions in the contract and how to read data from it.

Here is the generated **ABI**:

```json
[
	{
		"inputs": [],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
```

For each function, the JSON object contains the following properties:

- **inputs**: An array of input parameters for the function.
- **name**: The name of the function.
- **outputs**: An array of output parameters for the function.
- **stateMutability**: The state mutability of the function, which can be `pure`, `view`, `payable`, or `nonpayable`.
- **type**: The type of function, which can be `function`, `constructor`, `fallback`, or `receive`. In this case, both functions are of type `function`.

This field of the JSON array specifies the `retrieve` function:

```json
{
	"inputs": [],
	"name": "retrieve",
	"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
	],
	"stateMutability": "view",
	"type": "function"
},
```

a `view` function that takes no inputs and returns a `uint256` value. In this case, the `retrieve` function retrieves a stored value from the smart contract (i.e. `number`).

This field of the JSON array specifies the `store` function:

```json
{
	"inputs": [
		{
			"internalType": "uint256",
			"name": "num",
			"type": "uint256"
		}
	],
	"name": "store",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}
```

a `non-payable` function that takes a single input parameter `num` of type `uint256` and does not return any value. In this case, the `store` function sets the value of `number` in the smart contract.

## Bytecode

**Bytecode**, on the other hand, refers to the machine-readable instructions that make up the smart contract's program. It is generated by compiling the contract's source code, and it is what actually gets deployed to the blockchain.

**Bytecode**

```
608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632e64cec11461003b5780636057361d14610059575b600080fd5b610043610075565b60405161005091906100a1565b60405180910390f35b610073600480360381019061006e91906100ed565b61007e565b005b60008054905090565b8060008190555050565b6000819050919050565b61009b81610088565b82525050565b60006020820190506100b66000830184610092565b92915050565b600080fd5b6100ca81610088565b81146100d557600080fd5b50565b6000813590506100e7816100c1565b92915050565b600060208284031215610103576101026100bc565b5b6000610111848285016100d8565b9150509291505056fea26469706673582212202cc38a226e8494dee8ce23b3ba54edeef2876149c1565888ef8dd1b9652ec61e64736f6c63430008120033
```

Back to [top](#homework-3)