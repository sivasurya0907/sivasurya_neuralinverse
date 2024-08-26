
import { ethers } from 'ethers';
import { JsonRpcApiProvider } from 'ethers';
// Log the ethers object to verify it's imported correctly
console.log(ethers);

// Example usage of ethers.js to create a provider and log it
const provider = new JsonRpcApiProvider(
  "https://mainnet.infura.io/v3/018805e453ba45ceb5df94e968214724"
);
console.log("Provider:", provider);
