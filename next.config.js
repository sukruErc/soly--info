/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  },
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
  images: {
    // loader: 'custom',
    // loaderFile: './src/utilities/image.ts',
    domains: ["makyaj.com", "content.stoneity.com", "cosmorateapp.stoneity.com"],
    // unoptimized: true
  },
}

module.exports = nextConfig
