# ERC-20 Token Generator

A simple, user-friendly web application that allows anyone to create their own ERC-20 tokens on Ethereum (Sepolia) and Rootstock testnets without writing a single line of code.

## Features

- **Create Custom Tokens**: Deploy standard ERC-20 tokens with customizable name, symbol, and initial supply
- **Multi-Chain Support**: Deploy to Ethereum (Sepolia) or Rootstock testnets
- **MetaMask Integration**: Seamless wallet connection and automatic token addition
- **User-Friendly Interface**: Clean, glass-morphism UI design with real-time status updates
- **Network Auto-Switching**: Automatically handles network switching in MetaMask

## Tech Stack

- **Frontend**: React with functional components and hooks
- **Styling**: Tailwind CSS with custom glass-morphism effects
- **Blockchain Interaction**: ethers.js v6
- **Smart Contracts**: OpenZeppelin ERC-20 implementation
- **Build Tool**: Vite
- **Wallet**: MetaMask

## Prerequisites

- Node.js (v18+)
- MetaMask browser extension
- Test ETH on Sepolia or test RBTC on Rootstock testnet

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/erc-20-generator.git
   cd erc-20-generator
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your RPC URLs:

   ```bash
   ETHEREUM_RPC_URL=https://go.getblock.io/<ACCESS_TOKEN>
   ROOTSTOCK_RPC_URL=https://go.getblock.io/<ACCESS_TOKEN>
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. **Connect Wallet**: Click the "Connect Wallet" button to connect your MetaMask wallet
2. **Enter Token Details**:
   - **Name**: Your token's full name (e.g., "GetBlock")
   - **Symbol**: A short ticker symbol (e.g., "GTB")
   - **Initial Supply**: The amount of tokens to create initially
3. **Select Network**: Choose between Ethereum (Sepolia) or Rootstock testnet
4. **Deploy Token**: Click "Deploy Token" and confirm the transaction in MetaMask
5. **Add to Wallet**: After deployment, the token will be automatically added to your MetaMask

## Project Structure

```bash
/
├── contracts/                      # Smart contract source files
│   └── token.sol                   # ERC-20 token implementation
│
├── artifacts/                      # Compiled contract artifacts
│   ├── @openzeppelin/              # OpenZeppelin contract artifacts
│   └── contracts/ 
    └── build-info/                  # Project contract artifacts
│
├── src/                            # Frontend source code
│   ├── config/
│   │   └── networks.jsx            # Network configuration
│   │
│   ├── utils/
│   │   ├── token.jsx               # Token deployment functions
│   │   └── wallet.jsx              # Wallet connection functions
│   │
│   ├── App.jsx                     # Main application component
│   ├── index.css                   # Global styles
│   ├── main.jsx                    # Application entry point
│   ├── token.json                  # Token ABI
│   └── tokenBytecode.json          # Token bytecode
│
├── public/                         # Static assets
│
├── .env                            # Environment variables (RPC URLs)
├── .gitignore                      # Git ignore file
├── hardhat.config.js               # Hardhat configuration
├── package.json                    # Project dependencies
├── README.md                       # Project documentation
└── vite.config.js                  # Vite configuration
```

## Development

### Building for Production

```bash
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract implementations
- [ethers.js](https://docs.ethers.org/) for blockchain interaction
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development experience
- [MetaMask](https://metamask.io/) for wallet integration

## Disclaimer

This application is for educational purposes only. Tokens created with this tool have no inherent value. Always use testnets for experimentation.
