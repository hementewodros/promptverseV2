const hre = require("hardhat");

async function main() {
  const PromptVoting = await hre.ethers.getContractFactory("PromptVoting");
  const promptVoting = await PromptVoting.deploy(); // already deployed in Ethers v6
  console.log("PromptVoting deployed to:", promptVoting.target); // use `target`, not `address`
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
