import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import Ethereum from "./Ethereum";
import Bitcoin from "./Bitcoin";
import Solana from "./Solana";

function Wallets() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedWallet, setSelectedWallet] = useState("Ethereum");
    const [publicKey, setPublicKey] = useState("");
    const [privateKey, setPrivateKey] = useState("");
    const [balance, setBalance] = useState(0);
    const [showPrivateKey, setShowPrivateKey] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleShowPrivateKey = () => {
        setShowPrivateKey(!showPrivateKey);
    };

    const paths = {
        ethereum: "m/44'/60'/0'/0/0",
        bitcoin: "m/44'/0'/0'/0/0",
        solana: "m/44'/501'/0'/0'",
    };

    return (
        <div className="mt-12 flex flex-col gap-6">
            <div className="flex items-center">
                <div className="relative inline-block text-left">
                    {/* Dropdown Button */}
                    <h1 className="text-lg font-semibold mb-2">Select Wallet: </h1>
                    <button
                        id="dropdownDividerButton"
                        onClick={toggleDropdown}
                        className="text-white border w-44 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between"
                        type="button"
                    >
                        {selectedWallet}
                        <FaChevronDown className="w-2.5 h-2.5 ml-2" />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div
                            id="dropdownDivider"
                            className="z-10 bg-gray-700 divide-y divide-gray-600 rounded-lg shadow w-44 absolute mt-2"
                        >
                            <ul className="py-2 text-sm text-gray-200">
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                        onClick={() => { setSelectedWallet("Ethereum"); setIsOpen(false) }}
                                    >
                                        Ethereum
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                        onClick={() => { setSelectedWallet("Bitcoin"); setIsOpen(false) }}
                                    >
                                        Bitcoin
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 hover:bg-gray-600 hover:text-white"
                                        onClick={() => { setSelectedWallet("Solana"); setIsOpen(false) }}
                                    >
                                        Solana
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className="w-full mx-12 flex flex-col gap-4">
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
                                placeholder="Enter private key"
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
            <div className="w-full text-center">
                <h1 className="text-4xl font-semibold">Balance: {balance} {selectedWallet == "Ethereum" ? "ETH" : (selectedWallet == "Bitcoin" ? "BTC" : "SOL")}</h1>
            </div>
            <div>
                {selectedWallet === "Ethereum" && (
                    <Ethereum path={paths.ethereum} setPublicKey={setPublicKey} setPrivateKey={setPrivateKey} setBalance={setBalance} />
                )}
                {selectedWallet === "Bitcoin" && (
                    <Bitcoin path={paths.bitcoin} setPublicKey={setPublicKey} setPrivateKey={setPrivateKey} setBalance={setBalance} />
                )}
                {selectedWallet === "Solana" && (
                    <Solana path={paths.solana} setPublicKey={setPublicKey} setPrivateKey={setPrivateKey} setBalance={setBalance} />
                )}

            </div>
        </div>
    )
}

export default Wallets