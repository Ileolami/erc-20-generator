export const networks = {
  ethereum: {
    chainId: 11155111, 
    rpc: import.meta.env.ETHEREUM_RPC_URL,
    name: "Ethereum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorer: "https://sepolia.etherscan.io",
  },
  rootstock: {
    chainId: 31, 
    rpc: import.meta.env.ROOTSTOCK_RPC_URL,
    name: "Rootstock",
    nativeCurrency: {
      name: "TRBTC",
      symbol: "TRBTC",
      decimals: 18,
    },
    blockExplorer: "https://rootstock-testnet.blockscout.com",
  },
};