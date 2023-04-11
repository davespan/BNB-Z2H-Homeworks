# Homework 6

## Solutions

- [Badger NFT](#badger-nft)
- [Unit Tests](#unit-tests)

Go back to [Week 2](/Week%202/week-2-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Badger NFT

We now want to create an `NFT`:
1. Create a new project in the IDE of your choice.
>**Answer**: **Remix IDE** was used.
2. Create a `BadgerNFT` contract this should inherit from any [ERC721 implementation from the Open Zeppelin standard libraries](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/v4.8.2/contracts/token/ERC721).
3. Give your NFT a name and a symbol.
>**Answer**: Name: `BadgerNFT`, Symbol: `BDGR`.
4. Deploy your contract to the test network and send some NFTs.
>**Answer**: [Contract on the testnet](https://testnet.bscscan.com/address/0xc153a7e62d2ce3defd28cc89599decf44828a858).

For now we won't associate a digital asset with our token.

You can use the Open Zeppelin libraries to help with this.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BadgerNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BadgerNFT", "BDGR") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}
```

Back to [top](#solutions)

---

## Unit Tests

Write unit tests to check that you can:
1. Mint new NFTs
2. Transfer an NFT

```solidity
// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

// This import is automatically injected by Remix
import "remix_tests.sol"; 

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "../contracts/BadgerNFT.sol";

contract BadgerNFTTest {
    BadgerNFT badgerNFT;
    address owner;
    address recipient;
    uint256 tokenId;

    function beforeEach() public {
        badgerNFT = new BadgerNFT();
        owner = TestsAccounts.getAccount(0);
        recipient = TestsAccounts.getAccount(1);
    }

    function test_safeMint() public {
        // Minting tests
        badgerNFT.safeMint(owner);
        tokenId = 0;
        Assert.equal(
            badgerNFT.ownerOf(tokenId),
            owner,
            "Token not minted to owner"
        );

        Assert.equal(
            badgerNFT.balanceOf(owner),
            1,
            "Owner should have one token"
        );
    }
}
```

Back to [top](#solutions)