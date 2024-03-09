import { FrameRequest, getFrameHtmlResponse } from "@coinbase/onchainkit/frame";
import { NextRequest, NextResponse } from "next/server";

async function getResponse(req: NextRequest): Promise<NextResponse> {
    const body: FrameRequest = await req.json();

    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og?title=Statistics`,
            }
        })
    );
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = "force-dynamic";
