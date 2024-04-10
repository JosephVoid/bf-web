/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_MINIO_PROT,
        hostname: process.env.NEXT_PUBLIC_MINIO_URL,
        port: process.env.NEXT_PUBLIC_MINIO_PORT,
      },
    ],
  },
};

export default nextConfig;
