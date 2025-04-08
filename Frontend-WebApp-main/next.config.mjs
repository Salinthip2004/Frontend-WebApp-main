/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: 'https://64050702-api-backend.vercel.app/:path*', 
        },
      ]
    },
    reactStrictMode: true, 
  }
  
  export default nextConfig;