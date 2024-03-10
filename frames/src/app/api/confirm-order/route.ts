import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getLatestETHPrice() {
  const apiKeyToken = process.env.ETHERSCAN;
  const url = `https://api.etherscan.io//api?module=stats&action=ethprice&apikey=${apiKeyToken}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.result.ethusd;
}

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { untrustedData } = body;
  const depositAmount = untrustedData.inputText;
  const { searchParams } = new URL(req.url);
  const stakeEarned = 0.001; // right now hardcoding it, but we can get it from Contract on Gnosis API
  const margin = parseFloat(searchParams.get("margin") ?? "0.2");

  const usd = await getLatestETHPrice();
  const ethAmount = parseFloat(usd);
  console.log("depo" + depositAmount);

  console.log("ethamount" + ethAmount);
  const ethAmountTargettedPrice = ethAmount + ethAmount * margin;
  const usdcAbove = parseFloat(depositAmount) * ethAmountTargettedPrice;
  const ethAmountLow = parseFloat(depositAmount) + stakeEarned;

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Confirm Order",
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/images/confirm-order?ethprice=${ethAmount}&ethpricehigh=${usdcAbove}&ethpricelow=${ethAmountLow}&usdcabove=${usdcAbove}&target=${ethAmountTargettedPrice}`,
      },
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/finish-order?depositAmount=${depositAmount}&margin=${margin}`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
