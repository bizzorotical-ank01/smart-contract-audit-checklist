const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Overflow Attack", function () {
  let contract;

  beforeEach(async function () {
    const Vulnerable = await ethers.getContractFactory("OverflowVulnerable");
    contract = await Vulnerable.deploy();
    await contract.waitForDeployment();
  });

  it("should overflow total", async function () {
    const max = ethers.MaxUint256;

    await contract.add(max);
    await contract.add(1);

    const total = await contract.total();

    expect(total).to.equal(0);
  });
  it("should NOT overflow in fixed contract", async function () {
  const Fixed = await ethers.getContractFactory("OverflowFixed");
  const fixed = await Fixed.deploy();
  await fixed.waitForDeployment();

  const max = ethers.MaxUint256;

  await fixed.add(max);

  await expect(
    fixed.add(1)
  ).to.be.reverted;
});
});