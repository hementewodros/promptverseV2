const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

  const PromptVoting = await hre.ethers.getContractFactory("PromptVoting");
  const promptVoting = await PromptVoting.attach(contractAddress);

  const tx = await promptVoting.createPrompt("Why is the sky blue?");
  await tx.wait();

  const prompt = await promptVoting.getPrompt(1);
  console.log("Prompt:", prompt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
