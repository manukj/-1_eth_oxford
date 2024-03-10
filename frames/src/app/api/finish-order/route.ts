import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { Contract, Signer } from "ethers";
import { NextRequest, NextResponse } from "next/server";
import { DualProfitABI } from "./DualProfitAbi";
const cron = require("node-cron");
const ethers = require("ethers");

const { TEST_PRIVATE_KEY, SEPOLIA_RPC_URL } = process.env;
const provider = new ethers.providers.JsonRpcProvider(SEPOLIA_RPC_URL);
var amount: number, margin: number;

async function initSigner() {
  const wallet = new ethers.Wallet(TEST_PRIVATE_KEY);
  return wallet.connect(provider);
}

async function initContract() {
  const contractAddress = "0x23d0BF0DD147f2833F69b3E8836eae96225E87FC";
  return new ethers.Contract(contractAddress, DualProfitABI, provider);
}

async function placeOrderToSellEthLow(contract: Contract, signer: Signer) {
  // place the order with amount and margin
  const amountInEther = ethers.utils.parseEther(amount.toString());
  const tx = await contract
    .connect(signer)
    .placeOrderToSellEthLow(amountInEther, margin);
  return tx;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  // read query params depositAmount and margin
  const { searchParams } = new URL(req.url);
  amount = parseFloat(searchParams.get("depositAmount") ?? "0.1");
  margin = parseFloat(searchParams.get("margin") ?? "0.2");

  try {
    // get the signer hardcoding the private key
    const signer = await initSigner();
    // init the contract
    const contract = await initContract();
    // place the order
    const tx = await placeOrderToSellEthLow(contract, signer);
    await tx.wait();

    // once the order is placed, now execute a corn job after 6 days to execute the order at the targetted price
    cron.schedule("0 0 0 */6 * *", async () => {
      const tx = await contract.connect(signer).executeOrder();
      await tx.wait();
    });
  } catch (e) {
    console.log(e);
  }

  const body: FrameRequest = await req.json();
  return new NextResponse(
    getFrameHtmlResponse({
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og?title=Statistics`,
      },
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
