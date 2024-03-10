import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const walletBalance = searchParams.get("walletBalance") ?? "No balance";

    const walletAddress = searchParams.get("walletAddress") ?? "No balance";

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
            backgroundImage: `url('${process.env.NEXT_PUBLIC_SITE_URL}/background.png')`,
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
            {walletAddress.length > 10
              ? `${walletAddress.substring(0, 10)}...`
              : walletAddress}{" "}
          </p>
          {walletBalance && (
            <p
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 80,
                fontWeight: 700,
                margin: 0,
                marginTop: 20,
              }}
            >
              {walletBalance}
            </p>
          )}
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
