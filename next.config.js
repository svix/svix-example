/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'example.svix.com',
          },
        ],
        destination: 'https://anvil-technologies.com/:path*',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
