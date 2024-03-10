import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Default Title";

    // ?description=
    const hasDescription = searchParams.has("description");
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 100)
      : "";

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
            fontSize: 80,
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          <p
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))",
              backgroundClip: "text",
              color: "transparent",
              fontSize: 80,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Sell ETH at the best price
          </p>
          {
            <p
              style={{
                backgroundClip: "text",
                color: "white",
                fontSize: 30,
                fontWeight: 700,
                margin: 0,
                marginTop: 20,
              }}
            >
              Please input the amount of ETH you wish to sell, and<br>  choose your
              preferred margin.</br>
            </p>
          }
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
