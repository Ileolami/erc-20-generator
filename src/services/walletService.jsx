import { ethers } from "ethers";
import { networks } from "../config/networks";

export const connectWallet = async (networkId) => {
  if (!window.ethereum) throw new Error("Please install MetaMask");

  const selected = networks[networkId];
  const hexChainId = "0x" + selected.chainId.toString(16);

  // Switch or add chain
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    });
  } catch (switchError) {
    // Add the network if it doesn't exist in MetaMask
    if (switchError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: hexChainId,
            chainName: selected.name,
            rpcUrls: [selected.rpc],
            nativeCurrency: selected.nativeCurrency,
            blockExplorerUrls: [selected.blockExplorer],
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
  
  // Now connect
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  return await provider.getSigner();
};

export const switchNetwork = async (networkId, currentChainId) => {
  const selected = networks[networkId];
  const hexChainId = "0x" + selected.chainId.toString(16);
  
  if (currentChainId !== selected.chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: hexChainId,
              chainName: selected.name,
              rpcUrls: [selected.rpc],
              nativeCurrency: selected.nativeCurrency,
              blockExplorerUrls: [selected.blockExplorer],
            },
          ],
        });
      } else {
        throw switchError;
      }
    }
    
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    return await provider.getSigner();
  }
  
  return null;
};