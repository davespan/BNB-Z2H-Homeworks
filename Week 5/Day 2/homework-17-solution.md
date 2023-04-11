# Homework 17

Go back to [Week 5](/Week%205/week-5-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Using this [contract](https://gist.github.com/extropyCoder/11df000e4b0d7c94510fbd84e19f9650):
- Make the necessary changes to the contract so that it can be upgraded using the OpenZeppelin **UUPS**, the **U**niversal **U**pgradeable **P**roxy **S**tandard.
>You can find the project [here](/Week%205/Day%202/UpgradeMe/).
>
>**UpgradeMe.sol**

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract UpgradeMe is Initializable, UUPSUpgradeable {

    enum PaymentOptions{ Pay, Borrow, Defer, Extra }

    PaymentOptions options;
    PaymentOptions constant defaultChoice = PaymentOptions.Pay;

    mapping(address=>uint256) balance;
    uint256 initialBlock;
    uint256 nextPayout;
    string constant name = "Payout Tool";
    address owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function initialize(address _owner) initializer public {
        __UUPSUpgradeable_init();
        owner = _owner;
        initialBlock = block.number;
        nextPayout = initialBlock;
    }

    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    function processPayment(PaymentOptions  _option, address _to, uint256 _amount) public virtual {
        uint256 surcharge = 10;

        if(_option == PaymentOptions.Extra){
            surcharge = 20;
        }
        if(_to == owner ) {
             surcharge = 0;
        }
        uint256 transferAmount = _amount + surcharge; 
        require(balance[msg.sender] > transferAmount, "Low Balance"); 
        balance[msg.sender] = balance[msg.sender] - transferAmount;
        balance[_to] = balance[_to] + transferAmount; 
    }
}
```

- For the next version, change the `processPayment` function to update the payout block to be the current block.
>**UpgradeMeV2.sol**

```solidity
// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

import "./UpgradeMe.sol";

contract UpgradeMeV2 is UpgradeMe {
    function processPayment(PaymentOptions  _option, address _to, uint256 _amount) public override {
        super.processPayment(_option, _to, _amount);

        nextPayout = block.number;
    }
}
```

- Use the hardhat [plugin](https://docs.openzeppelin.com/upgrades-plugins/1.x/#install-hardhat) to deploy both contracts.
>**deploy.js**

```javascript
const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  const UpgradeMe = await ethers.getContractFactory("UpgradeMe");
  const instance = await upgrades.deployProxy(UpgradeMe, [deployer.address]);
  await instance.deployed();

  const UpgradeMeV2 = await ethers.getContractFactory("UpgradeMeV2");
  const upgraded = await upgrades.upgradeProxy(instance.address, UpgradeMeV2);
}

main();
```

Back to [top](#homework-17)