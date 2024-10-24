import React, { useEffect, useState } from 'react'
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import bs58 from "bs58";

function Solana({ path, setPublicKey, setPrivateKey, setBalance }) {

  const [mnemonic, setMnemonic] = useState('');

  async function generateSolanaKeys() {
    const seed = await mnemonicToSeed(mnemonic);
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setPublicKey(keypair.publicKey.toString());
    setPrivateKey(bs58.encode(keypair.secretKey));
    console.log(keypair);
    console.log(keypair.publicKey.toString());
    console.log(bs58.encode(keypair.secretKey));
    setBalance(0)
  }

  useEffect(() => {
    const storedMnemonic = localStorage.getItem('Mnemonic');
    if (storedMnemonic) {
      setMnemonic(storedMnemonic);
      generateSolanaKeys();
    }
  }, []);  // Dependency array

  return (
    <div>Solana</div>
  )
}

export default Solana