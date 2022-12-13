/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.rebrickable.com"],
  },
  experimental: {
    appDir: true,
    fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }],
  },
};

module.exports = nextConfig;
