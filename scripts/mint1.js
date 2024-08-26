// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const replace_contractAddress = "0xc75FB935ADC3786bD5A3B64E80A6465a9F94953d";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const replace_contractFactory = await hre.ethers.getContractFactory("MyToken");
  const contract = replace_contractFactory.attach(replace_contractAddress);

  // Send a shielded transaction to execute a transaction in the contract
  const replace_functionName = "mint";
  const replace_functionArgs = ["0x8Ab77353aC866B7Ab690890e620c249A8D3e92D0", "100"];
  const transaction = await sendShieldedTransaction(signer, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs), 0);

  await transaction.wait();

  // It should return a TransactionResponse object
  console.log("Transaction Response: ", transaction);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});