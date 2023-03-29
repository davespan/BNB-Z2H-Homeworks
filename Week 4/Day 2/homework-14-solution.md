# Homework 14

Go back to [Week 4](/Week%204/week-4-homeworks-solutions.md)

Go back to the [Table of Contents](/README.md)

---

## Solution

NFT Storage:
1. Create an account on [nft.storage](https://nft.storage/).
2. Upload a file that you wish to associate with your Badger NFT.
>[Uploaded image](https://bafybeib4ccvdagjeoc526yz47qatwkydxz3re3r5m5jxernscijudsdzo4.ipfs.nftstorage.link/)
3. Copy the CID, this will be the `token_URI` for your NFT.
>**CID**: bafybeib4ccvdagjeoc526yz47qatwkydxz3re3r5m5jxernscijudsdzo4
4. Create an NFT with this token URI.
>You can find the project [here](/Week%204/Day%202/BadgerNFT/).
>
>**BadgerNFT.sol**

```sol
// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BadgerNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("BadgerNFT", "BDGR") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
```

Back to [top](#homework-14)