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

**Optimised Contract**:

```sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

contract GasContract {
    address[5] public administrators;
    uint256 public immutable totalSupply; // cannot be updated

    struct Payment {
        uint256 paymentType;
        uint256 amount;
    }

    event Transfer(address, uint256);
    mapping(address => uint256) balances;
    mapping(address => Payment[]) payments;
    mapping(address => uint256) public whitelist;

    constructor(address[5] memory _admins, uint256 _totalSupply) payable {
        administrators = _admins;
        totalSupply = _totalSupply;
    }

    function transfer(address _recipient, uint256 _amount, string calldata _name) external {
        payments[msg.sender].push(Payment(1, _amount));
        unchecked {
        balances[_recipient] += _amount;
        }
        emit Transfer(_recipient, _amount);
    }

    function balanceOf(address _user) external view returns (uint256) {
        return balances[_user];
    }

    function updatePayment(address _user, uint256 _ID, uint256 _amount, uint256 _type) external {
        payments[_user][0].paymentType = _type;
        payments[_user][0].amount = _amount;
    }

    function getPayments(address _user) external view returns (Payment[] memory) {
        return payments[_user];
    }

    function getTradingMode() external pure returns (bool) {
        return true;
    }

    function addToWhitelist(address _userAddrs, uint256 _tier) external {
        whitelist[_userAddrs] = _tier;
    }

    function whiteTransfer(address _recipient, uint256 _amount, Payment calldata _struct) external {
        unchecked {
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