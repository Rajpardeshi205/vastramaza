/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",
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
  