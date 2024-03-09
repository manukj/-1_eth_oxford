/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [`${process.env.NEXT_PUBLIC_SITE_URL}`], // Add your domain here
  },
  metadata: {
    metadataBase: `${process.env.NEXT_PUBLIC_SITE_URL}`, // Set your metadata base URL here
  },
};

export default nextConfig;
