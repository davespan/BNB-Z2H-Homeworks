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