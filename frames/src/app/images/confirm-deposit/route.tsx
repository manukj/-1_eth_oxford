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
            backgroundImage: `url('${process.env.NEXT_PUBLIC_SITE_URL}/confirm_deposite.png')`,
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
              color: "white",
              fontSize: 80,
              fontWeight: 800,
              margin: 0,
              marginBottom: 10,
            }}
          >
            Verify your details
          </p>

          <p
            style={{
              color: "white",
              fontSize: 35,
              fontWeight: 600,
              margin: 0,
              textDecoration: "underline",
            }}
          >
           Wallet Address : {walletAddress.length > 10
              ? `${walletAddress.substring(0, 18)}...`
              : walletAddress}{" "}
          </p>
          {walletBalance && (
            <p
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgb(121, 40, 202), rgb(255, 0, 128))",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 75,
                fontWeight: 700,
                margin: 0,
                marginTop: 20,
              }}
            >
              Balance : {walletBalance}
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
