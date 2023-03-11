# Solution

- [Exercise 1](#exercise-1)
- [Exercise 2](#exercise-2)

## Exercise 1

To the [Bootcamp.sol](https://gist.github.com/extropyCoder/77487267da199320fb9c852cfde70fb1) contract:

1. Add a variable to hold the address of the deployer of the contract.
2. Update that variable with the deployer's address when the contract is deployed.
3. Write an external function to return:

    - Address `0x000000000000000000000000000000000000dEaD` if called by the deployer.
    - The deployer's address otherwise.

**Bootcamp.sol**:

```sol
// SPDX-License-Identifier: None

pragma solidity 0.8.17;

contract BootcampContract {
    uint256 number;
    address owner;

    constructor () {
        owner = msg.sender;
    }

    function store(uint256 num) public {
        number = num;
    }

    function retrieve() public view returns (uint256){
        return number;
    }

    function getAddress() public view returns (address) {
        if (msg.sender == owner) {
            return 0x000000000000000000000000000000000000dEaD;
        } else {
            return owner;
        }
    }
}
```

## Exercise 2

1. In Remix, create a new file called `DogCoin.sol`.
2. Define the pragma compiler version to `0.8.18`.
3. Before the pragma version, add a license identifier `// SPDX-License-Identifier: UNLICENSED`.
4. Create a contract called `DogCoin`.
5. Create a variable to hold the total supply, with an initial amount of 2 million.
6. Make a public function that returns the total supply.
7. Make a public function that can increase the total supply in steps of 1000.
8. Declare an `address` variable called `owner`. This address will be allowed to change the total supply.
9. Next, create a `modifier` which only allows an owner to execute certain functions.
10. Make your change total supply function `public`, but add your modifier so that only the owner can execute it.
11. Create a `constructor` to initialize the state of the contract and within the constructor, store the owner's address.
12. Create an `event` that emits the new value whenever the total supply changes. When the supply changes, emit this event.
13. In order to keep track of user balances, we need to associate a user's address with the balance that they have.
    - What is the best data structure to hold this association?
    > **Answer**: `mapping`.
    - Using your choice of data structure, set up a variable called `balances` to keep track of the number of tokens that a user has.
14. We want to allow the balances variable to be read from the contract, there are 2 ways to do this.

    What are those ways?
    > **Answer**: We can make the variable `public` or create a **getter function** to retrieve it.
    
    Use one of the ways to make your balances variable visible to users of the contract.
15. Now change the constructor, to give all of the total supply to the owner of the contract.
16. Now add a public function called `transfer` to allow a user to transfer their tokens to another address. This function should have 2 parameters:
    - the amount to transfer.
    - the recipient address.

    Why do we not need the sender's address here?
    >**Answer**: We can retrieve the sender's address from the globally available transaction property `msg.sender`.

    What would be the implication of having the sender's address as a parameter?
    >**Answer**: Anyone would be able to transfer tokens from any address of their choice to another.

17. Add an `event` to the transfer function to indicate that a transfer has taken place, it should log the amount and the recipient address.
18. We want to keep a record for each user's transfers. Create a `struct` called `Payment` that store the transfer amount and the recipient's address.
19. We want to have a payments array for each user sending the payment.

    Create a `mapping` which returns an array of `Payment` structs when given this user's address.

**DogCoin.sol**

```sol
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
```