// scripts/mint.js

const { ethers } = require("hardhat");

async function main() {
    // The address to receive the minted tokens

      // Get the ContractFactory and Signers here.
      const [deployer] = await ethers.getSigners();


    const recipientAddress = deployer.address; // Replace with the actual address

    // The amount to mint (100 tokens, considering 18 decimals)
    const mintAmount = ethers.formatUnits("100", 0);


    console.log(`This is token mint amount: ${mintAmount}`)

    // Get the deployed contract address
    const contractAddress = "0xc75FB935ADC3786bD5A3B64E80A6465a9F94953d"; // Replace with your contract address

    // Get the contract instance
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = MyToken.attach(contractAddress);

    // Get the deployer (or any owner account)
    const [owner] = await ethers.getSigners();

    console.log(`Minting 100 tokens to ${recipientAddress} from account ${owner.address}...`);

    // Call the mint function
    const tx = await myToken.connect(owner).mint(recipientAddress, mintAmount);

    // Wait for the transaction to be mined
    await tx.wait();

    console.log("Minting successful!");
    console.log(`Transaction hash: ${tx.hash}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
