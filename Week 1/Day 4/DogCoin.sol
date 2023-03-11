// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.18;

contract DogCoin {
    uint256 totalSupply = 2000000;
    uint16 incrementStep = 1000;

    address owner;

    struct Payment {
        uint256 amount;
        address to;
    }

    mapping(address => uint256) public balances;
    mapping(address => Payment[]) payments;

    event SupplyChanged(uint256 newTotalSupply);
    event Transferred(uint256 amount, address to);

    constructor() {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function increaseTotalSupply() public onlyOwner{
        totalSupply += incrementStep;

        emit SupplyChanged(totalSupply);
    }

    function transfer(uint256 _amount, address _to) public {
        require(balances[msg.sender] >= _amount, "Insufficient funds.");
        
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;

        payments[msg.sender].push(Payment(_amount, _to));

        emit Transferred(_amount, _to);
    }

    function getPayments(address _user) public view returns (Payment[] memory) {
        return payments[_user];
    }
}