const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PromptVoting", function () {
  let promptVoting;
  let owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const PromptVoting = await ethers.getContractFactory("PromptVoting");
    promptVoting = await PromptVoting.deploy();
    // ethers v6: .deployed() doesn't exist — deploy() resolves only when mined
  });

  it("should create a prompt", async function () {
    await promptVoting.createPrompt("Is AI sentient?");
    const prompt = await promptVoting.getPrompt(1);
    expect(prompt.content).to.equal("Is AI sentient?");
    expect(prompt.votes).to.equal(0);
  });

  it("should allow one vote per address per prompt", async function () {
    await promptVoting.createPrompt("What is Web3?");
    await promptVoting.connect(addr1).votePrompt(1);

    const updated = await promptVoting.getPrompt(1);
    expect(updated.votes).to.equal(1);

    await expect(
      promptVoting.connect(addr1).votePrompt(1)
    ).to.be.revertedWith("You already voted");
  });
});
