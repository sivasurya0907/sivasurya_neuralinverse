import axios from 'axios';

export const getBalance = async (address) => {
  try {
    const response = await axios.get('http://localhost:5000/api/balance', {
      params: { address },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};

export const transferFunds = async ({ amount, privateKey, address }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/transfer', {
      amount,
      privateKey,
      address,
    });
    return response.data;
  } catch (error) {
    console.error('Error transferring funds:', error);
    throw error;
  }
};
