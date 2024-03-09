import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit/frame'
import { NextRequest, NextResponse } from 'next/server'

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json()


    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Deposit Funds',
          },
        ],
        image: {
          src: `${process.env.NEXT_PUBLIC_SITE_URL}/og?title=Welcome`,
        },
        postUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/advanced`,
      })
    )
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req)
}

export const dynamic = 'force-dynamic'
