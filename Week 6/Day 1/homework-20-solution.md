# Homework 20

Go back to [Week 6](/Week%206/week-6-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Imagine you have been given the following [code](https://gist.github.com/extropyCoder/348528075d856da66f7cedcc7c48226a) to audit with the following note from the team:

***PuppyCoinGame** is an investment club where investors are added to the contract via the `addInvestor` function, they need to send **1 ETH** to join. Once **200** players have entered, the UI will be notified by the `payDividends` event, which will then pick the top investors and pay them some dividends. The remaining balance will be kept as profit for the developers.*

Write out the main points that you would include in an audit report.

>## Audit Report

- [Introduction](#introduction)
- [Findings and Recommendations](#findings-and-recommendations)
- [Conclusion](#conclusion)

### Introduction

We have audited the PuppyCoinGame smart contract, which is designed to implement an investment club on the Ethereum blockchain. Our audit focused on ensuring the contract’s functionality, security, and efficiency. We have analyzed the contract’s code, scrutinized its functionality and potential vulnerabilities, and identified areas that require improvement. In this report, we have summarized our findings, provided detailed recommendations, and offered a conclusion.

### Findings and Recommendations

- [Unclear Profit Generation Mechanism](#unclear-profit-generation-mechanism)
- [Redundant Assignment](#redundant-assignment)
- [`role` Variable and Role-based Access Control Issue](#role-variable-and-role-based-access-control-issue)
- [`addInvestor` Function](#addinvestor-function)
- [`numberInvestors` Variable](#numberinvestors-variable)
- [`makePayout` and `payOutDividends` Functions](#makepayout-and-payoutdividends-functions)


#### Unclear Profit Generation Mechanism 

Based on the code and information provided, the contract does not appear to have a clear mechanism for generating profits. The contract simply collects 1 ETH from each investor and uses the funds to pay dividends to the investors based on their investment upon reaching more than 200 investors. It is not clear how the contract will generate enough revenue to pay dividends in the long term, especially considering that the contract does not appear to have any investment or trading capabilities.

This lack of clarity on how profits will be generated is a concern for potential investors and could raise questions about the sustainability of the investment. It is recommended that the contract owner provides more information on how profits will be generated and sustained in the long term to increase transparency and attract potential investors.

#### Redundant Assignment

The `dividendRate` variable is already initialized with a value of **12** during its declaration, so setting it again to **12** in the `constructor` is redundant. While this redundant code does not harm the functionality of the contract, it is unnecessary and can be safely removed.

#### `role` Variable and Role-based Access Control Issue

The `role` variable is defined but not initialized or used in the contract. This variable's purpose is unclear, and it is suspicious. Instead of using `role`, it would be clearer to use a variable like `admin` that is set in the constructor with `msg.sender`. This would make it clear who has admin privileges in the contract.

Additionally the contract uses a modifier called `onlyAdmin` that is supposed to ensure that only the owner or authorized address can execute specific functions. However, the modifier checks the `tx.origin` instead of `msg.sender`, which is not recommended as `tx.origin` can be manipulated by attackers. To fix this issue, the modifier should use `msg.sender` instead of `tx.origin`.

The `onlyAdmin` modifier is intended to ensure that only the designated admin can execute a particular function. However, the modifier does not revert when the condition is not met, which could lead to unexpected behavior. We recommend that the `onlyAdmin` modifier be updated with a require statement to ensure that only the designated admin can execute the function.

Here's an example implementation:

```solidity
<SNIP>
address admin;

constructor() ERC20("PuppyCoin", "PUC") {
    admin = msg.sender;
}

modifier onlyAdmin() {
    require(msg.sender == admin, "Only the admin can call this function");
    _;
}
<SNIP>
```

#### `addInvestor` Function

The `addInvestor` function allows investors to join the club by sending 1 ETH to the contract. However, the function requires a payment of **2 ETH** instead of the stated requirement of **1 ETH**. We recommend that the `addInvestor` function be updated to require a payment of 1 ETH. Furthermore, using `require` statements for input validation in Solidity is generally recommended over using `if` statements. This is because require statements will revert the transaction and refund the remaining gas to the caller if the condition is not met, which is a more secure and robust way to handle invalid inputs.

#### `numberInvestors` Variable

The `numberInvestors` variable is not being properly incremented in the `addInvestor` function. This means that the variable will always have the initial value of zero throughout the execution of the contract. This could potentially cause issues with triggering the dividend payout when the expected number of investors is reached.
We recommend that the `addInvestor` function increment the `numberInvestors` variable each time an investor is added to the `investors` array. Alternatively, you could remove the `numberInvestors` variable and use the `investors.length` property to determine the number of investors.

>**Note**: It's possible that the developer intended to increase the `numberInvestors` variable in the `addInvestor` function instead of `currentDividend`.

#### `makePayout` and `payOutDividends` Functions

It is unclear what the `makePayout` and `payOutDividends` should actually do.

The `makePayout` function is intended to pay out dividends to the *top investors* (which in the contract weirdly refers to the first 100 investors of the `investors` array) once the number of participants is greater than **200**. However, the function only pays out if the contract balance is exactly 100 ETH, which is impossible to happen since having 200 investors means having a fund of at least 200 ETH. 

Furthermore, the function can only be called by the `admin`, which means that the investors are reliant on the contract owner to distribute the dividends rather than being able to trigger the payout themselves.

The `payOutDividends` function is public which means that anyone can call it. This defeats the purpose of having a condition that the number of investors must be greater than 200 before paying out dividends.

Furthermore, the function includes an off-by-one error in the `for` loop that iterates over the `investors`. This could cause the function to revert and revert the entire transaction, leaving the contract balance unaffected.

To fix this issues, the `for` loop should use use the condition `i < investors.length` instead of `i <= investors.length`, and the function visibility changed from `public` to `internal`.

>**Note**: A local `currentDividend` variable is declared inside the function, leaving the storage variable of the same name unchanged. It is possible that the developer intended to modify the `currentDividend` storage variable instead of declaring and using a local variable of the same name.

### Conclusion

Our audit of the PuppyCoinGame smart contract identified several issues that require attention. We have provided recommendations to address these issues and ensure that the contract functions as intended. Implementing these recommendations will reduce the contract's complexity, improve its security and efficiency, and enhance user experience. We encourage the contract's developers to implement these changes and conduct additional testing to ensure the contract's safety and reliability.

Back to [top](#homework-20)