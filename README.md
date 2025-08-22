# Prompt Voting DApp

A fully functional decentralized application (DApp) where users can post prompts and vote on them. Built using **Solidity**, **Hardhat**, **React**, **Ethers.js**, and optionally **IPFS**. This DApp is deployed on the **Sepolia Testnet** and hosted for free on Vercel/Netlify/GitHub Pages.

---

## 🚀 Features

* Connect your wallet via MetaMask.
* Post new prompts (stored on-chain or optionally on IPFS).
* Vote once per prompt.
* Real-time updates using smart contract events.
* Sort prompts by latest or most voted.
* Responsive UI and mobile-friendly.

---

## 🛠 Technologies Used

* **Frontend:** React, Ethers.js, react-toastify, CSS
* **Backend / Smart Contracts:** Solidity, Hardhat
* **Blockchain:** Ethereum Sepolia Testnet
* **Optional Storage:** IPFS via Web3.Storage
* **Hosting:** Vercel / Netlify / GitHub Pages

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/prompt-dapp.git
cd prompt-dapp
```

### Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend / Hardhat
cd ../backend
npm install
```

### Environment Variables

Create a `.env` file in `/backend`:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_metamask_private_key
```

> ⚠️ Never commit your private key or API keys.

Optional frontend variables in `.env`:

```env
REACT_APP_CONTRACT_ADDRESS=0xYourSepoliaContractAddress
```

---

## 💻 Running Locally

### Start Local Hardhat Node (optional for testing)

```bash
cd backend
npx hardhat node
```

### Deploy to Local Network

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Start Frontend

```bash
cd frontend
npm start
```

* Open your browser at `http://localhost:3000`
* Connect MetaMask to localhost network.

---

## 🌐 Deploying to Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

* Get free Sepolia ETH from [https://sepoliafaucet.com/](https://sepoliafaucet.com/)
* Update frontend `REACT_APP_CONTRACT_ADDRESS` with Sepolia deployed contract.

### Hosting Frontend

* **Vercel:** Connect GitHub repo, deploy.
* **Netlify:** Drag `build` folder or connect GitHub repo.
* **GitHub Pages:** Use `gh-pages` to deploy `build` folder.

---

## 🔧 Usage

1. Open DApp and connect your MetaMask wallet.
2. Post a new prompt using the input field.
3. Vote for prompts (1 vote per wallet per prompt).
4. View real-time updates as other users post and vote.
5. Sort prompts by "Latest" or "Most Voted".
6. Optionally click prompts to view details in a modal.

---

## 📝 Smart Contract Functions

* `createPrompt(string memory _contentOrIPFS)` - Creates a new prompt.
* `votePrompt(uint _id)` - Vote for a prompt (once per wallet).
* `getPrompt(uint _id)` - Fetch prompt details.
* `promptCount()` - Get total number of prompts.

**Events:**

* `PromptCreated(uint id, string content, address creator)`
* `Voted(uint id, address voter)`

---

## 💡 Best Practices

* Use a burner wallet for testnets.
* Always validate input on frontend.
* Monitor Sepolia transactions via [https://sepolia.etherscan.io](https://sepolia.etherscan.io)
* Optional: Use IPFS for longer prompt storage to save gas.

---

## 🔗 Links

* Live DApp: \[Your Deployed URL]
* GitHub Repository: [https://github.com/yourusername/prompt-dapp](https://github.com/yourusername/prompt-dapp)
* Sepolia Etherscan: [https://sepolia.etherscan.io/address/0xYourContractAddress](https://sepolia.etherscan.io/address/0xYourContractAddress)

---

## 🎉 Contribution & Feedback

* Open an issue or submit a PR for improvements.
* Feature ideas: user profiles, rewards, analytics, gas optimization.
* Share feedback or report bugs for better iterations.

---

## 🏆 Credits

* Developed by \[Your Name]
* Solidity inspiration: OpenZeppelin & Hardhat docs
* Frontend inspiration: React and Ethers.js tutorials
* IPFS integration: Web3.Storage documentation
