const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Context Comparison", function () {
    let contextTest, caller, owner, other, contextAddr;

    beforeEach(async () => {
        [owner, other] = await ethers.getSigners();

        const ContextTest = await ethers.getContractFactory("ContextTest");
        contextTest = await ContextTest.deploy();
        await contextTest.waitForDeployment();
        contextAddr = await contextTest.getAddress();

        const Caller = await ethers.getContractFactory("Caller");
        caller = await Caller.deploy();
        await caller.waitForDeployment();
    });

    it("直接调用 ContextTest", async () => {
        await contextTest.whoAmI();

        contextTest.on("Log", (msgSender, _msgSender, thisAddress, event) => {
            console.log("\n捕获到Log事件:");
            console.log(`msg.sender: ${msgSender}`);
            console.log(`_msgSender(): ${_msgSender}`);
            console.log(`合约地址: ${thisAddress}`);
            console.log(`交易哈希: ${event.transactionHash}`);
            console.log(`区块号: ${event.blockNumber}`);
        })

    });

    it("通过 Caller 合约调用 ContextTest", async () => {
        await caller.callWhoAmI(contextAddr);

        contextTest.on("Log", (msgSender, _msgSender, thisAddress, event) => {
            console.log("\n捕获到Log事件:");
            console.log(`msg.sender: ${msgSender}`);
            console.log(`_msgSender(): ${_msgSender}`);
            console.log(`合约地址: ${thisAddress}`);
            console.log(`交易哈希: ${event.transactionHash}`);
            console.log(`区块号: ${event.blockNumber}`);
        })
    });
});
