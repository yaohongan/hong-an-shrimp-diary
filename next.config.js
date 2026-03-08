/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    VERCEL_TOKEN: process.env.VERCEL_TOKEN,
  },
  async rewrites() {
    return [
      {
        source: '/api/update',
        destination: '/api/update',
      },
    ]
  },
}

module.exports = nextConfig
