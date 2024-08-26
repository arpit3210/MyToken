// scripts/mint.js

const { ethers } = require("hardhat");

async function main() {
    // The address to receive the minted tokens

      // Get the ContractFactory and Signers here.
      const [deployer] = await ethers.getSigners();


    const recipientAddress = "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1"; // Replace with the actual address

    // The amount to mint (100 tokens, considering 18 decimals)
    const TokenAmount = ethers.formatUnits("1", 0);


    console.log(`Token transfer amount: ${TokenAmount}`)

    // Get the deployed contract address
    const contractAddress = "0xc75FB935ADC3786bD5A3B64E80A6465a9F94953d"; // Replace with your contract address

    // Get the contract instance
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = MyToken.attach(contractAddress);

    // Get the deployer (or any owner account)
    const [owner] = await ethers.getSigners();

    console.log(`Sending ${TokenAmount} tokens to ${recipientAddress} from account ${owner.address}...`);

    // Call the mint function
    const tx = await myToken.connect(owner).transfer(recipientAddress, TokenAmount);

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
