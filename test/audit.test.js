const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Reentrancy Attack", function () {
  let deployer, attacker;
  let vulnerable, attackContract;

  beforeEach(async function () {
    [deployer, attacker] = await ethers.getSigners();

    const Vulnerable = await ethers.getContractFactory("ReentrancyVulnerable");
    vulnerable = await Vulnerable.deploy();
    await vulnerable.waitForDeployment();

    await vulnerable.connect(deployer).deposit({
      value: ethers.parseEther("5"),
    });

    const Attacker = await ethers.getContractFactory("Attacker");
    attackContract = await Attacker.connect(attacker).deploy(vulnerable.target);
    await attackContract.waitForDeployment();
  });

  it("should drain funds via reentrancy", async function () {
    await attackContract.connect(attacker).attack({
      value: ethers.parseEther("1"),
    });

    const balance = await ethers.provider.getBalance(vulnerable.target);
    expect(balance).to.equal(0);
  });

  it("should FAIL to drain fixed contract", async function () {
    const Fixed = await ethers.getContractFactory("ReentrancyFixed");
    const fixed = await Fixed.deploy();
    await fixed.waitForDeployment();

    await fixed.deposit({
      value: ethers.parseEther("5"),
    });

    const Attacker = await ethers.getContractFactory("Attacker");
    const attack = await Attacker.connect(attacker).deploy(fixed.target);
    await attack.waitForDeployment();

    await expect(
      attack.connect(attacker).attack({
        value: ethers.parseEther("1"),
      })
    ).to.be.reverted;
  });
});