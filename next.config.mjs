/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'prod-img.thesouledstore.com',
        },
      ],
    },
  };
  
  export default nextConfig;
  