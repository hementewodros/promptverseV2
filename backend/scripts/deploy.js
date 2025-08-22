const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const PromptVoting = await hre.ethers.getContractFactory("PromptVoting");
  const promptVoting = await PromptVoting.deploy(); // deploy contract
  await promptVoting.deployed; // wait for deployment

  console.log("PromptVoting deployed to:", promptVoting.target);

  // Save the deployed address to a JSON file
  fs.writeFileSync(
    "./deployedAddress.json",
    JSON.stringify({ address: promptVoting.target }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
