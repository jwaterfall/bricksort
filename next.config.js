/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['cdn.rebrickable.com'],
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA(nextConfig);
