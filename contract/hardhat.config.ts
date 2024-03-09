import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotEnv from "dotenv";
dotEnv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_TEST_NET_RPC_URL,
      accounts: [`${process.env.TEST_NET_PRIVATE_KEY}`],
    },
  },
};

export default config;
