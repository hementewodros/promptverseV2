const { expect } = require("chai");
const { ethers } = require("hardhat"); // make sure ethers is imported

describe("PromptVoting", function () {
  let promptVoting;

  beforeEach(async function () {
    const PromptVoting = await ethers.getContractFactory("PromptVoting");
    promptVoting = await PromptVoting.deploy(); // deployment itself is async
    // no need for promptVoting.deployed() in ethers v6
  });

  it("should create a prompt", async function () {
    await promptVoting.createPrompt("Is AI sentient?");
    const prompt = await promptVoting.getPrompt(1);
    expect(prompt.content).to.equal("Is AI sentient?");
    expect(prompt.votes).to.equal(0);
  });

  it("should allow one vote per address per prompt", async function () {
    const [owner, addr1] = await ethers.getSigners();
    await promptVoting.createPrompt("What is Web3?");
    await promptVoting.connect(addr1).votePrompt(1);

    const updated = await promptVoting.getPrompt(1);
    expect(updated.votes).to.equal(1);

    await expect(
      promptVoting.connect(addr1).votePrompt(1)
    ).to.be.revertedWith("You already voted");
  });
});
