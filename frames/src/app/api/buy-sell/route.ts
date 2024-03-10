import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { untrustedData } = body;
    
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "Buy Low",
          
        },
        {
          label: "Sell High",
        },
      ],
      image: {
        src: `${process.env.NEXT_PUBLIC_SITE_URL}/images/buy-or-sell`,
      },
      postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/sell`,

    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
