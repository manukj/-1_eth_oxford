import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge'

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)

        const hasEth = searchParams.has('ethprice')
        const eth = hasEth
            ? searchParams.get('ethprice')?.slice(0, 100)
            : ''


        const hasEthHigh = searchParams.has('ethpricehigh')
        const ethHigh = hasEthHigh
            ? searchParams.get('ethpricehigh')?.slice(0, 100)
            : ''

        const hasEthLow = searchParams.has('ethpricelow')
        const ethLow = hasEthLow
            ? searchParams.get('ethpricelow')?.slice(0, 100)
            : ''

            
        const hasTarget = searchParams.has('target')
        const tar = hasTarget
            ? searchParams.get('target')?.slice(0, 100)
            : ''

        return new ImageResponse(
            (
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
                        fontSize: 30,
                        fontWeight: 700,
                        textAlign: 'center',
                    }}
                >
                    <p
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontSize: 30,
                            fontWeight: 700,
                            margin: 0,
                        }}
                    >
                        Current : {eth} USDC/ETH
                    </p>
                    <p
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontSize: 30,
                            fontWeight: 700,
                            margin: 0,
                            marginTop: 20,
                        }}
                    >
                        Target : {tar} USDC/ETH

                    </p>
                    <p
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontSize: 30,
                            fontWeight: 700,
                            margin: 0,
                            marginTop: 20,
                        }}
                    >
                        Above Margin : {ethHigh} USDC

                    </p>
                    <p
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontSize: 30,
                            fontWeight: 700,
                            margin: 0,
                            marginTop: 20,
                        }}
                    >
                        Below Margin : {ethLow} ETH
                    </p>
                    <p
                        style={{
                            backgroundImage:
                                'linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontSize: 30,
                            fontWeight: 700,
                            margin: 0,
                            marginTop: 20,
                        }}
                    >
                      Time period : 6 days

                    </p>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: any) {
        console.log(`${e.message}`)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}
