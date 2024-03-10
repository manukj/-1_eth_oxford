import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasEth = searchParams.has("ethprice");
    const eth = hasEth ? searchParams.get("ethprice")?.slice(0, 100) : "";

    const hasEthHigh = searchParams.has("ethpricehigh");
    const ethHigh = hasEthHigh
      ? searchParams.get("ethpricehigh")?.slice(0, 100)
      : "";

    const hasEthLow = searchParams.has("ethpricelow");
    const ethLow = hasEthLow
      ? searchParams.get("ethpricelow")?.slice(0, 100)
      : "";

    const hasTarget = searchParams.has("target");
    const tar = hasTarget ? searchParams.get("target")?.slice(0, 100) : "";

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundImage: `url('${process.env.NEXT_PUBLIC_SITE_URL}/sell.png')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            fontSize: 30,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "grey",
              fontSize: 30,
              fontWeight: 700,
              margin: 0,
              textDecoration: "underline",
            }}
          >
            Current Price of Ether :
            <span style={{ fontWeight: 900, marginLeft: 5 }}>
              {parseFloat(eth ?? "0").toFixed(2)} USDC
            </span>
          </p>
          <p
            style={{
              color: "grey",
              fontSize: 30,
              fontWeight: 700,
              margin: 0,
              marginTop: 20,
              textDecoration: "underline",
            }}
          >
            Targeting Price : {parseFloat(tar ?? "0").toFixed(2)} USDC
            {" ( After 20% margin )"}
          </p>
          <hr></hr>

          <p
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: 700,
              margin: 0,
              marginTop: 20,
            }}
          >
            After
            <span style={{ fontWeight: 900, marginLeft: 5 }}>
              6 days ( FIXED PERIOD)
            </span>
          </p>
          <p
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
              backgroundClip: "text",
              color: "white",
              fontSize: 30,
              fontWeight: 500,
              margin: 0,
              marginTop: 20,
            }}
          >
            Price &gt;= Margin:
            <span
              style={{
                fontWeight: 900,
                marginLeft: 10,
                fontSize: 35,
                textDecoration: "underline",
              }}
            >
              {parseFloat(ethHigh ?? "0").toFixed(2)} USDC
            </span>
          </p>
          <p
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
              backgroundClip: "text",
              color: "white",
              fontSize: 30,
              fontWeight: 500,
              margin: 0,
              marginTop: 20,
            }}
          >
            Price &lt;= Margin:
            <span
              style={{
                fontWeight: 900,
                marginLeft: 10,
                fontSize: 35,
                textDecoration: "underline",
              }}
            >
              {parseFloat(ethLow ?? "0").toFixed(2)} ETH
            </span>
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
