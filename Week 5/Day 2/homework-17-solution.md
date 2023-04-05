# Homework 17

Go back to [Week 5](/Week%205/week-5-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Using this [contract](https://gist.github.com/extropyCoder/11df000e4b0d7c94510fbd84e19f9650):
- Make the necessary changes to the contract so that it can be upgraded using the OpenZeppelin **UUPS**, the **U**niversal **U**pgradeable **P**roxy **S**tandard.
- Use the hardhat [plugin](https://docs.openzeppelin.com/upgrades-plugins/1.x/#install-hardhat) to deploy the contract.
- For the next version, change the `processPayment` function to update the payout block to be the current block.
- Use the hardhat plugin to deploy the upgraded contract.
>TODO
Back to [top](#homework-17)