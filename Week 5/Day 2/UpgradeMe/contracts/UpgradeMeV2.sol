// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

import "./UpgradeMe.sol";

contract UpgradeMeV2 is UpgradeMe {
    function processPayment(PaymentOptions  _option, address _to, uint256 _amount) public override {
        super.processPayment(_option, _to, _amount);

        nextPayout = block.number;
    }
}