/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_PUBLIC_MINIO_URL],
  },
};

export default nextConfig;
