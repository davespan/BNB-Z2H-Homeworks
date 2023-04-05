const { expect } = require("chai");
const helpers = require("@nomicfoundation/hardhat-network-helpers");

describe("Pair Interaction and Address Impersonation", function () {
    let routerContract;
    let legoContract;
    let busdtContract;
    let pairContract;

    const routerAbi = require('../contracts/PancakeRouter.json');
    const legoAbi = require('../contracts/LEGOToken.json');
    const busdtAbi = require('../contracts/BEP20USDT.json');
    const pairAbi = require('../contracts/PancakePair.json');

    const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E";
    const busdtAddress = "0x55d398326f99059fF775485246999027B3197955";
    const legoAddress = "0x520EbCcc63E4d0804b35Cda25978BEb7159bF0CC";
    const pairAddress = "0xb95817627a289EDB10C4fe6a126f41665Eb6B8B9";

    const mockAccount = ethers.Wallet.createRandom();
    
    before(async function() {
        routerContract = await ethers.getContractAt(routerAbi, routerAddress);
        legoContract = await ethers.getContractAt(legoAbi, legoAddress);
        busdtContract = await ethers.getContractAt(busdtAbi, busdtAddress);
        pairContract = await ethers.getContractAt(pairAbi, pairAddress);
    });

    it("Should get the reserves of LEGO-BUSD-T pair", async function () {
        const reserves = await pairContract.getReserves();
        expect(reserves._reserve0).to.be.gt(0);
        expect(reserves._reserve1).to.be.gt(0);
    });

    it("Should get latest update", async function () {
        const update = await pairContract.getReserves();
        expect(update._blockTimestampLast).to.be.gt(0);
    });

    it("Should impersonate an address and obtain some LEGO", async function () {
        const testAddress = "0xffefE959d8bAEA028b1697ABfc4285028d6CEB10";
        await helpers.impersonateAccount(testAddress);
        const impersonatedSigner = await ethers.getSigner(testAddress);

        await legoContract.connect(impersonatedSigner).transfer(mockAccount.address, 1000);
        const legoBalance = await legoContract.balanceOf(mockAccount.address);
        expect(legoBalance).to.be.equal(1000);
    });
    /*
    it("Should swap LEGO for BUSD-T", async function () {
        await legoContract.approve(routerAddress, 500);

        await routerContract.swapExactTokensForTokens(
            500,
            0,
            [legoAddress, busdtAddress],
            mockAccount.address,
            Math.floor(Date.now() / 1000) + 60 * 20
        );

        const busdtBalance = await busdtContract.balanceOf(mockAccount.address);
        expect(busdtBalance).to.be.equal(500);
    });
    */
});