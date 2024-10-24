import { mnemonicToSeed } from 'bip39';
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import { derivePath } from "ed25519-hd-key";
import { Keypair, Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl"

function SolanaWallet({ mnemonic }) {
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [balance, setBalance] = useState(0);
    const [showPrivateKey, setShowPrivateKey] = useState(false);

    const toggleShowPrivateKey = () => {
        setShowPrivateKey(!showPrivateKey);
    };

    async function generateKeyPair() {
        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/0'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        const encodedPrivateKey = Buffer.from(keypair.secretKey).toString('hex');
        setPrivateKey(encodedPrivateKey);
        
        // Convert public key to Base58 and store it
        const publicKeyBase58 = keypair.publicKey.toBase58();
        setPublicKey(publicKeyBase58);

        const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
        const publicKeyObject = new PublicKey(keypair.publicKey);
        const balanceInLamports = await connection.getBalance(publicKeyObject);
        setBalance(balanceInLamports / 1e9);
    }

    useEffect(() => {
        generateKeyPair();
    }, [mnemonic])
    return (
        <div className='w-full border rounded-lg flex flex-col gap-4 p-4'>
            <h1 className='text-center font-semibold text-3xl'>{balance} SOL</h1>
            <div className="w-full flex flex-col gap-4">
                {/* Public Key Input */}
                <div>
                    <label
                        htmlFor="public_key"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Public Key
                    </label>
                    <div className="relative">
                        <FaKey className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            id="public_key"
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg w-full pl-10 p-2.5"
                            placeholder="public key"
                            value={publicKey}
                            readOnly
                        />
                    </div>
                </div>

                {/* Private Key Input with Show/Hide Toggle */}
                <div>
                    <label
                        htmlFor="private_key"
                        className="block mb-2 text-sm font-medium text-white"
                    >
                        Private Key
                    </label>
                    <div className="relative">
                        <FaKey className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type={showPrivateKey ? "text" : "password"}  // Toggle between text and password
                            id="private_key"
                            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:placeholder-gray-400"
                            placeholder="private key"
                            value={privateKey}
                            readOnly
                        />
                        {/* Show/Hide Toggle Button */}
                        <button
                            type="button"
                            onClick={toggleShowPrivateKey}
                            className="absolute right-3 top-3 text-gray-400 focus:outline-none"
                        >
                            {showPrivateKey ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SolanaWallet;