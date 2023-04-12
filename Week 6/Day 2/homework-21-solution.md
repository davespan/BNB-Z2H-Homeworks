# Homework 21

Go back to [Week 6](/Week%206/week-6-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Take this [contract](https://gist.github.com/extropyCoder/6e9b5d5497b8ead54590e72382cdca24) and:
- Use the [sol2uml](https://github.com/naddison36/sol2uml) tool to find out how many storage slots it is using.
- By reordering the variables, can you reduce the number of storage slots
needed ?
>Reordering the variables like this:

```solidity
<SNIP>

contract Store {
    struct payments {
        bool valid;
        bool checked;
        uint8 paymentType;
        address sender;
        address receiver;
        uint256 amount;
        uint256 finalAmount;
        uint256 initialAmount;
    }
    uint8 index;
    bool flag1;
    bool flag2;
    bool flag3;
    address admin;
    address admin2;
    uint256 public number;
    mapping (address=>uint256) balances;
    payments[8] topPayments;

<SNIP>
```
>we reduce the number of storage slots for:
>- `Store <<Contract>>` by **17**.
>- `payments[8]: topPayments <<Array>>` by **17**.
>- `payments <<Struct>>` by **3**.

Back to [top](#homework-21)