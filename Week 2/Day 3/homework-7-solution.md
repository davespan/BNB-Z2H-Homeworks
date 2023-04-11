# Homework 7

Go back to [Week 2](/Week%202/week-2-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Look at the following contract, there are a number of vulnerabilities and flaws. Try to find all of the problems.

You do not need to fix any of the problems.

**BadLottery.sol**

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BadLotteryGame {
    uint256 public prizeAmount;         // payout amount
    address payable[] public players;    
    uint256 public num_players;        
    address payable[] public prize_winners; 
    event winnersPaid(uint256);

    constructor() {}

    function addNewPlayer(address payable _playerAddress) public payable {
        if (msg.value == 500000) {
            players.push(_playerAddress);
        }
        num_players++;
        if (num_players > 50) {
            emit winnersPaid(prizeAmount);
        }
    }

    function pickWinner(address payable _winner) public {
        if ( block.timestamp % 15 == 0){    // use timestamp for random number
            prize_winners.push(_winner);
        }          
    }

    function payout() public {
        if (address(this).balance == 500000 * 100) {
            uint256 amountToPay = prize_winners.length / 100;
            distributePrize(amountToPay);
        }
    }

    function distributePrize(uint256 _amount) public {
        for (uint256 i = 0; i <= prize_winners.length; i++) {
            prize_winners[i].transfer(_amount);
        }
    }
}
```

### Problems

- **Floating Pragma**: It is generally recommended to lock the pragma version for production contracts to ensure that the code behaves consistently across different compiler versions. 

- **Outdated compiler version**: The compiler version used in the contract is outdated and may have security vulnerabilities and other issues.

- **Unnecessary import**: The contract imports the ERC20 contract from the OpenZeppelin library, but it does not use any of its functions or variables.

- **Lack of access control**: Anyone can call the functions in the contract, and there is no check to ensure that only authorized parties can access or manipulate sensitive data.

- **Unused variables**: `prizeAmount` is never used in any of the contract's functions.

- **Variable inconsistency**: The `num_players` variable is incremented for each new player regardless of whether they meet the condition of sending `500000` wei.

- **Inadequate randomness**: The pickWinner function uses the block timestamp to generate a random number, which is not truly random.

- **Incorrect loop condition**: The `distributePrize` function has an incorrect loop condition, as it uses the `<=` operator instead of `<`, which can lead to an index out of bounds error.

- **Lack of error handling**: The contract does not include any error handling or fallback mechanisms, which can leave the contract vulnerable to unexpected behavior and exploits.

- **Insecure transfer of funds**: The `distributePrize` function transfers funds to the winner addresses using the transfer function, which is not safe to use in a loop. If one of the transfers fails, the entire transaction will be reverted, and the remaining winners will not receive their prize. Additionally, the contract does not include any checks to ensure that the transfer amount is valid or that the contract has enough funds to cover the transfers.

- **Lack of validation**: The `addNewPlayer` function does not validate the input parameter `_playerAddress`, which can potentially allow an attacker to add a non-payable address or a contract address that may execute malicious code.

- **Lack of withdrawal mechanism**: The contract does not include any mechanism for players to withdraw their funds if they decide not to participate or if they encounter an error.

- **Use of magic numbers**: The contract uses magic numbers such as `500000` and `100` without any explanation or context, which can make the code more difficult to understand and maintain.

- **Incomplete constructor**: The constructor is empty, which can make it difficult to initialize the contract and ensure that all required parameters are set correctly.

Back to [top](#homework-7)

