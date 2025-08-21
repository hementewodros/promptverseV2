import { ethers } from "ethers";
import abi from "../contracts/PromptVoting.json";
import contractAddress from "../contracts/contract-address.json";
import { getSigner } from "../utils/wallet";

export const getContract = () => {
  const signer = getSigner();
  return new ethers.Contract(contractAddress.PromptVoting, abi.abi, signer);
};
