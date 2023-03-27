# Homework 12

Go back to [Week 3](/Week%203/week-3-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Gas Optimisation Game:
- Follow the `README` instructions in this
[repo](https://github.com/ExtropyIO/ExpertSolidityBootcamp/tree/main/exercises/gas).

**Pre-optimisation** average costs:

```bash
·----------------------------------|----------------------------|-------------|-----------------------------·
|       Solc version: 0.8.19       ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 30000000 gas  │
···································|····························|·············|······························
|  Methods                                                                                                  │
················|··················|··············|·············|·············|···············|··············
|  Contract     ·  Method          ·  Min         ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
················|··················|··············|·············|·············|···············|··············
|  GasContract  ·  addToWhitelist  ·       82756  ·      86542  ·      84894  ·         2400  ·          -  │
················|··················|··············|·············|·············|···············|··············
|  GasContract  ·  transfer        ·      169276  ·     220600  ·     194940  ·           20  ·          -  │
················|··················|··············|·············|·············|···············|··············
|  GasContract  ·  updatePayment   ·           -  ·          -  ·     212354  ·            2  ·          -  │
················|··················|··············|·············|·············|···············|··············
|  GasContract  ·  whiteTransfer   ·           -  ·          -  ·     123301  ·            6  ·          -  │
················|··················|··············|·············|·············|···············|··············
|  Deployments                     ·                                          ·  % of limit   ·             │
···································|··············|·············|·············|···············|··············
|  GasContract                     ·           -  ·          -  ·    4653697  ·       15.5 %  ·          -  │
·----------------------------------|--------------|-------------|-------------|---------------|-------------·
```

**Optimised Contract** (as seen in class):

```sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19; // Changed to latest version

// Constants contract and its variables have been removed.

// Ownable inheritance has been removed.
contract GasContract {
    uint256 public immutable totalSupply; // Cannot be updated -> totalSupply is now immutable.
    // balances is now private. To get balances we can use the balanceOf function.
    mapping(address => uint256) private balances;

    // tradePercent variable has been removed.

    // contractOwner variable has been removed.

    // tradeMode variable has been removed.

    // payments is now private. To get payments we can use the getPayments function.
    mapping(address => Payment[]) private payments;
    mapping(address => uint256) public whitelist;
    address[5] public administrators;

    // isReady variable has been removed.

    // PaymentType enum has been removed.

    // defaultPayment constant has been removed.

    // paymentHistory variable has been removed.

    // Payment struct has been simplified.
    struct Payment {
        uint256 paymentType;
        uint256 amount;
    }

    // History struct has been removed.

    // wasLastOdd and isOddWhitelistUser variables have been removed.

    // ImportantStruct struct has been removed.

    // whiteListStruct mapping has been removed.

    // AddedToWhitelist event has been removed.

    // onlyAdminOrOwner modifier has been removed.

    // checkIfWhiteListed modifier has been removed.

    // supplyChanged event has been removed.

    event Transfer(address recipient, uint256 amount);

    // PaymentUpdated event has been removed.

    // WhiteListTransfer event has been removed.

    constructor(address[5] memory _admins, uint256 _totalSupply) {
        /**
         * Removed unecessary code.
         * administrators is now initialized to _admins.
         */
        administrators = _admins;
        totalSupply = _totalSupply;
    }

    // getPaymentHistory function has been removed.

    // checkForAdmin function has been removed.

    function balanceOf(address _user) public view returns (uint256) {
        return balances[_user]; // now returns data directly without passing through intermediate variables.
    }

    // getTradingMode function is now pure and external.
    function getTradingMode() external pure returns (bool) {
        // Previous code always returned true, so we just return true.
        return true;
    }

    // addHistory function has been removed.

    // getPayments function has been simplified.
    function getPayments(
        address _user
    ) external view returns (Payment[] memory) {
        // Removed unnecessary code.
        return payments[_user];
    }

    // transfer function has been simplified.
    function transfer(
        address _recipient,
        uint256 _amount,
        string calldata _name
    ) external {
        payments[msg.sender].push(Payment(1, _amount));
        unchecked { // unchecked was used to circumvent checked arithmetic and save gas.
            balances[_recipient] += _amount;
        }
        emit Transfer(_recipient, _amount);
    }

    // updatePayment function has been simplified.
    function updatePayment(
        address _user,
        uint256 _ID,
        uint256 _amount,
        uint256 _type
    ) external {
        // Removed unnecessary code.
        payments[_user][0].paymentType = _type;
        payments[_user][0].amount = _amount;
    }

    function addToWhitelist(address _userAddrs, uint256 _tier) external {
        // Removed unnecessary code.
        whitelist[_userAddrs] = _tier;
    }

    // whiteTransfer function has been simplified.
    function whiteTransfer(
        address _recipient,
        uint256 _amount,
        Payment calldata _struct
    ) external {
        // Removed unnecessary code.
        unchecked {
            // unchecked was used to circumvent checked arithmetic and save gas.
            uint256 temp = _amount - whitelist[msg.sender];
            balances[msg.sender] -= temp;
            balances[_recipient] += temp;
        }
    }
}
```

**Post-optimisation** average costs:

```bash
·----------------------------------|---------------------------|-------------|-----------------------------·
|       Solc version: 0.8.19       ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 30000000 gas  │
···································|···························|·············|······························
|  Methods                                                                                                 │
················|··················|·············|·············|·············|···············|··············
|  Contract     ·  Method          ·  Min        ·  Max        ·  Avg        ·  # calls      ·  usd (avg)  │
················|··················|·············|·············|·············|···············|··············
|  GasContract  ·  addToWhitelist  ·      44097  ·      44121  ·      44120  ·         2400  ·          -  │
················|··················|·············|·············|·············|···············|··············
|  GasContract  ·  transfer        ·      78480  ·     112704  ·      97304  ·           20  ·          -  │
················|··················|·············|·············|·············|···············|··············
|  GasContract  ·  updatePayment   ·          -  ·          -  ·      34870  ·            2  ·          -  │
················|··················|·············|·············|·············|···············|··············
|  GasContract  ·  whiteTransfer   ·          -  ·          -  ·      51804  ·            6  ·          -  │
················|··················|·············|·············|·············|···············|··············
|  Deployments                     ·                                         ·  % of limit   ·             │
···································|·············|·············|·············|···············|··············
|  GasContract                     ·          -  ·          -  ·     505809  ·        1.7 %  ·          -  │
·----------------------------------|-------------|-------------|-------------|---------------|-------------·
```

Back to [top](#homework-12)