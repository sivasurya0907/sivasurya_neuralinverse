import express from "express";
import cors from "cors";
import { getBalance, transferFunds } from "./routes/wallet.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/api/balance", async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res.status(400).json({ error: "Address parameter is required" });
    }

    const balance = await getBalance(address);
    res.json({ address, balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res
      .status(500)
      .json({ message: "Error fetching balance", error: error.message });
  }
});

app.post("/api/transfer", async (req, res) => {
  try {
    const { amount, privateKey, address } = req.body;
    const transaction = await transferFunds({ amount, privateKey, address });
    res.json({ txHash: transaction.transactionHash });
  } catch (error) {
    console.error("Error transferring funds:", error);
    res
      .status(500)
      .json({ message: "Error transferring funds", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
