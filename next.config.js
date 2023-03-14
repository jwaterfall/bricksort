/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.rebrickable.com"],
    },
};

const withPWA = require("next-pwa")({
    dest: "public",
});

module.exports = withPWA(nextConfig);
