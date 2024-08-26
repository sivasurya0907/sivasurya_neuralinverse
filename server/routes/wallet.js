import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeyby.infura.io/v3/018805e453ba45ceb5df94e968214724'));

export const getBalance = async (address) => {
  if (!web3.utils.isAddress(address)) {
    throw new Error('Invalid Ethereum address');
  }
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
};

export const transferFunds = async ({ amount, privateKey, address }) => {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  const tx = {
    to: address,
    value: web3.utils.toWei(amount, 'ether'),
    gas: 2000000,
  };

  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};
