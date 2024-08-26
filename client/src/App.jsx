import React, { useState } from "react";
import { transferFunds, getBalance } from "./api/index"; // Importing API functions from the api folder
import "./App.css";

const App = () => {
  const [amount, setAmount] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [transactionUrl, setTransactionUrl] = useState("");

  const handleTransfer = async () => {
    setLoading(true);
    try {
      const response = await transferFunds({ amount, privateKey, address });
      setTransactionUrl(`https://mumbai.polygonscan.com/tx/${response.txHash}`);
    } catch (error) {
      console.error("Error transferring funds:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkBalance = async () => {
    setLoading(true);
    try {
      const response = await getBalance(address);
      setBalance(response.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App center">
      <div className="card">
        <h1 id="heading">Crypto Wallet</h1>
        <div className="form">
          <div className="field">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="field">
            <textarea
              placeholder="Private Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="field">
            <input
              type="text"
              placeholder="Transfer Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="button-container">
            <button
              onClick={handleTransfer}
              disabled={loading}
              className="button1"
            >
              {loading ? (
                <div className="loader">{/* Loader implementation */}</div>
              ) : (
                "Transfer"
              )}
            </button>
            <button
              onClick={checkBalance}
              disabled={loading}
              className="button2"
            >
              {loading ? "Loading..." : "Check Balance"}
            </button>
          </div>
          {balance !== null && (
            <p className="small">Your Balance: {balance} MATIC</p>
          )}
          {transactionUrl && (
            <a href={transactionUrl} target="_blank" rel="noopener noreferrer">
              Check Your Transaction
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
