import React, { useState } from "react";
import { connectWallet } from "./utils/wallet";

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnect = async () => {
    const address = await connectWallet();
    if (address) setWalletAddress(address);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🧠 Prompt Voting DApp</h1>
      {!walletAddress ? (
        <button onClick={handleConnect}>Connect Wallet</button>
      ) : (
        <p>Connected: {walletAddress}</p>
      )}
    </div>
  );
}

export default App;
