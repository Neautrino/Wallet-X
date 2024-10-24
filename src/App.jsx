import React, { useEffect, useState } from 'react'
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from 'bip39';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'; // Icons from react-icons
import EthereumWallet from './components/EthereumWallet';
import SolanaWallet from './components/SolanaWallet';


function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function handleGenerateMn() {
    const newMn = await generateMnemonic();
    console.log(newMn); 
    localStorage.setItem('Mnemonic', newMn);
    setMnemonic(newMn);
    setIsOpen(true);
  }

  useEffect(()=>{
    const mn = localStorage.getItem('Mnemonic');
    if(mn){
      setMnemonic(mn);
    }
  }, [])
  return (
    <main className='w-full h-full p-20'> 
      <div>
        <h1 className='text-3xl font-extrabold '>Wallet-X</h1>
      </div>
      <div className='flex flex-col max-w-5xl mx-auto gap-2 mt-12'>
        <div className='flex items-center gap-8'>
          <div className="w-full max-w-3xl bg- border border-gray-200 rounded-lg shadow-md p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={toggleDropdown}
            >
              <h3 className="text-xl font-semibold">Seed Phrase: </h3>
              <span>{isOpen ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}</span>
            </div>
            {isOpen && (
              <div className="mt-4">
                <div className="">{mnemonic}</div>
              </div>
            )}
          </div>
          <button className='border bg-gray-200 rounded-full p-4 text-black font-semibold text-lg' onClick={handleGenerateMn}>Generate New</button>
        </div>
        
      </div>
      <div className='flex gap-16 m-8 mt-16'>
          <EthereumWallet mnemonic={mnemonic} />
          <SolanaWallet mnemonic={mnemonic} />
        </div>
    </main>
  )
}

export default App