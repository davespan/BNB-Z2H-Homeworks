# Homework 19

Go back to [Week 5](/Week%205/week-5-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

Write a *Shame coin* contract:
1. The *Shame coin* needs to have an administrator address that is set in the constructor.
2. The decimal places should be set to 0.
3. The administrator can send 1 *Shame coin* at a time to other addresses (but keep the transfer function signature the same).
4. If non administrators try to transfer their *Shame coin*, the transfer function will instead increase their balance by one.
5. Non administrators can approve the administrator (and only the administrator) to spend one token on their behalf.
6. The transfer from function should just reduce the balance of the holder.
7. Write unit tests to show that the functionality is correct.
8. Document the contract with [Natspec](https://docs.soliditylang.org/en/v0.8.17/natspec-format.html), and produce docs from this.

>TODO

Back to [top](#homework-19)