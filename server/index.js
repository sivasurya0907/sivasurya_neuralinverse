import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { JsonRpcProvider } from 'ethers';

import { ethers } from 'ethers';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 50;

app.use(bodyParser.json());
app.use(cors());

const provider = new JsonRpcProvider(process.env.INFURA_URL);


// API endpoint to get balance
app.get('/api/balance', async (req, res) => {
  try {
    

      if (!ethers.utils.isAddress(address)) {
          return res.status(400).send('Invalid Ethereum address');
      }

      const balance = await provider.getBalance(address);
      const balanceInEth = ethers.utils.formatEther(balance);

      res.json({ balance: balanceInEth });
  } catch (error) {
      console.error('Error fetching balance:', error.message);
      res.status(500).send('Server error');
  }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
