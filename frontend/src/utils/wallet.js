import { ethers } from "ethers";

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    } catch (error) {
      console.error("User rejected connection:", error);
    }
  } else {
    alert("MetaMask not detected");
  }
};

export const getProvider = () => {
  if (!window.ethereum) throw new Error("No wallet found");
  return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async () => {
  const provider = getProvider();
  return provider.getSigner();
};
