import React, { useState } from "react";
import { networks } from "./config/networks";
import { connectWallet, switchNetwork } from "./services/walletService";
import { deployToken, addTokenToWallet } from "./services/tokenService";

const TokenCreator = () => {
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    supply: "",
    network: "ethereum",
  });
  const [status, setStatus] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const [signer, setSigner] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleConnectWallet = async () => {
    try {
      const signerInstance = await connectWallet(form.network);
      setSigner(signerInstance);
      setWalletConnected(true);
      setStatus("✅ Wallet connected to " + form.network);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to connect or switch network");
    }
  };
  
  const handleDeployToken = async () => {
    const { name, symbol, supply, network } = form;

    if (!signer) {
      setStatus("❌ Wallet not connected");
      return;
    }

    try {
      // Check if we need to switch networks
      const currentNetwork = await signer.provider.getNetwork();
      const selected = networks[network];
      
      if (currentNetwork.chainId !== selected.chainId) {
        setStatus("Switching to " + network + " network...");
        const newSigner = await switchNetwork(network, currentNetwork.chainId);
        if (newSigner) setSigner(newSigner);
      }
      
      setStatus("Deploying token...");
      const tokenAddress = await deployToken(name, symbol, supply, signer);
      setStatus(`✅ Token deployed at ${tokenAddress}`);

      await addTokenToWallet(tokenAddress, symbol);
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to deploy token");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto my-48 rounded-xl shadow-md border space-y-4">
      <h2 className="text-xl font-semibold text-center">Cross-Chain ERC-20 Token Maker</h2>

      {!walletConnected ? (
        <button
          onClick={handleConnectWallet}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 sh"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <input
            type="text"
            name="name"
            placeholder="Token Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="symbol"
            placeholder="Token Symbol"
            value={form.symbol}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="supply"
            placeholder="Initial Supply"
            value={form.supply}
            onChange={handleChange}
            className="w-full p-2 border rounded "
          />
          <select
            name="network"
            value={form.network}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="ethereum">Ethereum</option>
            <option value="rootstock">Rootstock</option>
          </select>

          <button
            onClick={handleDeployToken}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Deploy Token
          </button>
        </>
      )}

      {status && <p className="text-sm mt-2">{status}</p>}
    </div>
  );
};

export default TokenCreator;
