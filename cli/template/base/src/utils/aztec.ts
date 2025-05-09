import { createAztecNodeClient } from '@aztec/aztec.js'
import { AztecWalletSdk, obsidion } from '@nemi-fi/wallet-sdk'

// const aztecNode = "https://l2.testnet.nemi.fi";
const aztecNode = 'https://registry.obsidion.xyz/node'
const WALLET_URL = 'https://app.obsidion.xyz'

// Create the Aztec Wallet SDK instance
export const sdk = new AztecWalletSdk({
    aztecNode: aztecNode,
    connectors: [obsidion({ walletUrl: WALLET_URL })],
})

const pxeUrl = aztecNode
// const pxeUrl = "http://localhost:8081";
// export const pxe = createPXEClient(pxeUrl);
export const pxe = createAztecNodeClient(pxeUrl)

// Function to connect to the Obsidian wallet
export const connectWallet = async () => {
    try {
        await sdk.connect('obsidion')
        return await sdk.getAccount()
    } catch (error) {
        console.error('Failed to connect to Obsidian wallet:', error)
        throw error
    }
}