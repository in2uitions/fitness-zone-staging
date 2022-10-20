/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  country_code: 'AE',
}


module.exports = {
  images: {
      domains: [
          'fzcms.diastora.com'
        ],
  },
  nextConfig
}