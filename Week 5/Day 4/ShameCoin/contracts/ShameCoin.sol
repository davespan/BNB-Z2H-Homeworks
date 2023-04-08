// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

/**
* @title ShameCoin token
* @author dasp
*/

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ShameCoin is ERC20, Ownable {
    constructor() ERC20("ShameCoin", "SHM") {}

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    /**
    * @notice Transfers one ShameCoin to the recipient. Can only be executed if the amount is 1.
    * @param recipient The address of the recipient of the transfer.
    * @param amount The amount of ShameCoin to be transferred.
    * @return bool indicating whether the transfer was successful.
    */
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(amount == 1, "You can only transfer 1 ShameCoin at a time.");
        if (msg.sender == owner()) {
            _mint(msg.sender, 1);
            return super.transfer(recipient, amount);
        } else {
            require(balanceOf(msg.sender) > 0, "Transfer amount exceeds balance");
            _mint(msg.sender, 1);
            return true;
        }
    }

    /**
    * @notice Approves the spender to transfer one ShameCoin. Can only be executed if the amount is 1 and the spender is the owner.
    * @param spender The address of the spender to be approved.
    * @param amount The amount of ShameCoin to be approved.
    * @return bool indicating whether the approval was successful or not.
    */
    function approve(address spender, uint256 amount) public override returns (bool) {
        require(amount == 1, "You can only approve 1 ShameCoin at a time.");
        require(spender == owner(), "Only admin can be approved.");
        return super.approve(spender, 1);
    }

    /**
    * @notice Burns one ShameCoin from the sender. Can only be executed if the amount is 1 and the sender is the owner.
    * @param sender The address of the sender of the burn
    * @param recipient The address of the recipient of the burn
    * @param amount The amount of ShameCoin to be burned
    * @return bool indicating whether the burn was successful or not.
    */
    function transferFrom(address sender, address recipient, uint256 amount) public override onlyOwner returns (bool) {
        require(amount == 1, "You can only burn 1 ShameCoin at a time.");
            _burn(sender, amount);
            return true;
    }
}