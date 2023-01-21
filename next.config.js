/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.rebrickable.com", "www.jack-waterfall.com"],
    },
    experimental: {
        appDir: true,
        fontLoaders: [{ loader: "@next/font/google", options: { subsets: ["latin"] } }],
    },
};

module.exports = nextConfig;
