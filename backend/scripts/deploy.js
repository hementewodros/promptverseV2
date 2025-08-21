const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const PromptVoting = await hre.ethers.getContractFactory("PromptVoting");
  const promptVoting = await PromptVoting.deploy();

  const address = promptVoting.target;
  console.log("PromptVoting deployed to:", address);

  // Save the address to a file
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ PromptVoting: address }, null, 2)
  );

  // Also save ABI
  const artifact = await hre.artifacts.readArtifact("PromptVoting");
  fs.writeFileSync(
    path.join(contractsDir, "PromptVoting.json"),
    JSON.stringify(artifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
