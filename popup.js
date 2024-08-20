document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form").addEventListener("click", handler);
  document
    .getElementById("check_balance")
    .addEventListener("click", checkBalance);
});

function handler() {
  document.getElementById("center").style.display = "flex";

  const private_key = document.getElementById("private_key").value;
  const amount = document.getElementById("amount").value;
  const address = document.getElementById("address").value;

  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/018805e453ba45ceb5df94e968214724"
  );

  let wallet = new ethers.Wallet(private_key, provider);

  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  };

  var a = document.getElementById("link");
  a.href = "somelink url";

  wallet
    .sendTransaction(tx)
    .then((txObj) => {
      console.log("txHash", txObj.hash);
      document.getElementById("center").style.display = "none";
      const a = document.getElementById("link");
      a.href = `https://mumbai.polygonscan.com/tx/${txObj.hash}`;
      document.getElementById("link").style.display = "block";
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("center").style.display = "none";
    });
}

function checkBalance() {
  document.getElementById("center").style.display = "flex";

  const provider = new ethers.providers.JsonRpcProvider(
    "https://mainnet.infura.io/v3/018805e453ba45ceb5df94e968214724"
  );

  const address = document.getElementById("address").value;
  provider
    .getBalance(address)
    .then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      document.getElementById(
        "check_balance"
      ).innerText = `Your Balance: ${balanceInEth} MATIC`;
      console.log(`balance: ${balanceInEth} ETH`);
      document.getElementById("center").style.display = "none";
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("center").style.display = "none";
    });
}
