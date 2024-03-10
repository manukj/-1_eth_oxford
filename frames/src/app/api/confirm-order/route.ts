import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { untrustedData } = body;
  let deposit = untrustedData.inputText;
  const apiKeyToken = process.env.ETHERSCAN;
  const url = `https://api.etherscan.io//api?module=stats&action=ethprice&apikey=${apiKeyToken}`;
  const response = await fetch(url);
  const data = await response.json();
  const usd = data.result.ethusd;   
  const ethAmount = parseInt(deposit) * parseInt(usd);
  console.log("depo"+deposit);
  console.log("usd"+usd);

  console.log("ethamount"+ethAmount);
  const ethAmountHigh = ethAmount + (ethAmount * 0.2);
  const ethAmountLow = parseInt(deposit) + 0.01;



  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Confirm Order",
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/images/confirm-order?ethprice=${ethAmount}&ethpricehigh=${ethAmountHigh}&ethpricelow=${ethAmountLow}`,
      },
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stats`,
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
