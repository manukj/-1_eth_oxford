import { ethers } from "hardhat";

async function main() {
  var usdcTokenAddress = "0x51fCe89b9f6D4c530698f181167043e1bB4abf89"; // USDC token address on Sepolia testnet
  var ethTokenAddress = "0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa"; // WETH token address on Sepolia testnet
  //deploy DualInvestment
  const dualInvestment = await ethers.deployContract("DualInvestment", [
    usdcTokenAddress,
    ethTokenAddress,
  ]);

  await dualInvestment.waitForDeployment();

  console.log(`DualInvestment deployed to ${dualInvestment.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
