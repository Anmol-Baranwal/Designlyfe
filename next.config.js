/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      // 'github.com',
      // 'github-production-user-asset-6210df.s3.amazonaws.com',
      // 'www.getillustrations.com',
      // 'public-files.gumroad.com',
    ],
  },
}

module.exports = nextConfig
