# Wallet-X: Multi-Chain Wallet Application

**Wallet-X** is a web-based application that allows users to generate and manage both Ethereum and Solana wallets from a single mnemonic seed phrase. The app provides an easy-to-use interface for generating wallets, displaying public/private keys, and fetching real-time balances on the respective networks.

![Wallet-X Interface](./screenshots/wallet-x-interface.png)

## Features

- **Mnemonic Generation**: Easily generate a new mnemonic seed phrase and store it in `localStorage` for future access.
- **Ethereum Wallet**: Generate Ethereum addresses, show public/private keys, and fetch real-time ETH balance from the Ethereum blockchain.
- **Solana Wallet**: Generate Solana addresses, show public/private keys, and fetch real-time SOL balance from the Solana blockchain.
- **Secure Key Management**: Toggle visibility of private keys to keep them secure while still allowing easy access when needed.

## Technology Stack

- **React**: A JavaScript library for building user interfaces.
- **Ethers.js**: A library to interact with the Ethereum blockchain.
- **Solana Web3.js**: A library to interact with the Solana blockchain.
- **BIP39**: Used for generating and managing mnemonic seed phrases.
- **Infura**: Ethereum API service provider.
- **React Icons**: For icons in the UI.

## Deployed Application

You can access the live version of Wallet-X here: [Wallet-X on Vercel](https://wallet-x-ecru.vercel.app/)

## Getting Started

### Installation
1. Clone the repository:

```bash
git clone https://github.com/your-username/wallet-x.git
cd wallet-x
```
2. Install the dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a .env file in the root directory and add your Infura API key:

```bash
VITE_INFURA_API_KEY=your_infura_api_key
```
4. Running the Application

```bash
npm install
npm run dev
```

## Future Enhancements

- Transaction Support: Add the ability to send ETH and SOL directly from the wallet.
- QR Code Support: Generate a QR code for easier sharing of public addresses.
- Multi-Network Support: Add support for other blockchains such as Polygon or Binance Smart Chain.

## Contributing
We welcome contributions! If you would like to contribute, please fork the repository and submit a pull request. You can also raise issues for any bugs or feature requests.