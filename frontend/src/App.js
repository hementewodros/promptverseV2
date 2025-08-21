import React, { useState } from "react";
import { connectWallet } from "./utils/wallet";
import { getContract } from "./hooks/usePromptContract";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all prompts from contract
  const fetchPrompts = async () => {
    try {
      const contract = getContract();
      const count = await contract.promptCount();
      const list = [];
      for (let i = 1; i <= count; i++) {
        const prompt = await contract.getPrompt(i);
        list.push(prompt);
      }
      setPrompts(list);
    } catch (err) {
      console.error("Failed to fetch prompts:", err);
    }
  };

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) {
      setWalletAddress(address);
      fetchPrompts();
    }
  };

  const handleCreatePrompt = async (e) => {
    e.preventDefault();
    if (!newPrompt) return;
    setLoading(true);

    try {
      const contract = getContract();
      const tx = await contract.createPrompt(newPrompt);
      await tx.wait();  // Wait for mining
      setNewPrompt("");
      fetchPrompts();   // Refresh list
    } catch (err) {
      console.error("Failed to create prompt:", err);
      alert("Failed to create prompt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧠 Prompt Voting DApp</h1>

      {!walletAddress ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <>
          <p>Connected: {walletAddress}</p>

          <form onSubmit={handleCreatePrompt}>
            <input
              type="text"
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="Enter a new prompt"
              style={{ marginRight: "10px", width: "300px" }}
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Prompt"}
            </button>
          </form>

          <h3>📝 All Prompts</h3>
          <ul>
            {prompts.map((p) => (
              <li key={p.id.toString()}>
                <strong>{p.content}</strong> — {p.votes.toString()} votes
              </li>
            ))}
          </ul>
        </>
      )}        
    </div>
  );
}

export default App;
