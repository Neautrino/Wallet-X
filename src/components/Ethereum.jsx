import React, { useState, useEffect } from 'react'
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

function Ethereum() {
    const [mnemonic, setMnemonic] = useState('');
    async function generateEthereumKeys() {
        const seed = await mnemonicToSeed(mnemonic);
        const hdNode = HDNodeWallet.fromSeed(seed);
        const child = hdNode.derivePath(path);
        setPublicKey(child.publicKey);
        setPrivateKey(child.privateKey);
        setBalance(0);
    }

    useEffect(() => {
        const storedMnemonic = localStorage.getItem('Mnemonic');
        if (storedMnemonic) {
          setMnemonic(storedMnemonic);
          generateEthereumKeys();
        }
      }, []);  // Dependency array to avoid rerunning the effect
      

    return (
        <div>
            Ethereum
        </div>
    )
}

export default Ethereum