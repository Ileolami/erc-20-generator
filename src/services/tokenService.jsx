import { ethers } from "ethers";
import XToken from "../token.json";
import XTokenBytecode from "../tokenBytecode.json";

export const deployToken = async (name, symbol, supply, signer) => {
  const factory = new ethers.ContractFactory(
    XToken.abi,
    XTokenBytecode.bytecode,
    signer
  );

  const contract = await factory.deploy(
    name,
    symbol,
    ethers.parseUnits(supply, 18)
  );
  
  await contract.waitForDeployment();
  const tokenAddress = await contract.getAddress();
  
  return tokenAddress;
};

export const addTokenToWallet = async (address, symbol) => {
  await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address,
        symbol,
        decimals: 18,
      },
    },
  });
};