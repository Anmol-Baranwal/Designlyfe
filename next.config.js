/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'images.unsplash.com',
      // 'github.com',
      // 'github-production-user-asset-6210df.s3.amazonaws.com',
      'www.getillustrations.com', // getillustrations
      // 'public-files.gumroad.com', // craftwork final link
      'craftwork-images.b-cdn.net', // craftwork
      'assets-global.website-files.com', // lsgraphics
    ],
  },
}

module.exports = nextConfig
