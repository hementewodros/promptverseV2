const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const { address } = JSON.parse(fs.readFileSync("./deployedAddress.json"));

  const PromptVoting = await hre.ethers.getContractFactory("PromptVoting");
  const promptVoting = PromptVoting.attach(address);

  const tx = await promptVoting.createPrompt("Why is the sky blue?");
  await tx.wait();

  const prompt = await promptVoting.getPrompt(1);
  console.log("Prompt:", prompt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
