import { getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { ethers } from "ethers";
import { NextRequest, NextResponse } from "next/server";
const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");

const { TEST_API_KEY, TEST_PRIVATE_KEY, WALLET_ADDRESS } = process.env;

async function getResponse(req: NextRequest): Promise<NextResponse> {
  async function getEthBalance() {
    return fetch(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.TEST_API_KEY}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Cookie:
            "_cfuvid=FEVb7AFtjS04UTO0lzre6Dbp2jiWicuamU4hdr_aYFU-1710020333166-0.0.1.1-604800000",
        },
        body: JSON.stringify({
          method: "eth_getBalance",
          params: [`${WALLET_ADDRESS}`, "latest"],
          id: 42,
          jsonrpc: "2.0",
        }),
      }
    );
  }

  var balance = await getEthBalance();
  var walletBalance = await balance.json();
  walletBalance = ethers.utils.formatEther(walletBalance.result);

  walletBalance = walletBalance.slice(0, 4) + " ETH";

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Agree and Continue",
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/images/confirm-deposit?walletBalance=${walletBalance}&walletAddress=${WALLET_ADDRESS}`,
      },
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/buy-sell`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
