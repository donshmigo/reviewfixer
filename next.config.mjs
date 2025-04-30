/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com', // For Google profile images
      'firebasestorage.googleapis.com', // For Firebase storage
    ],
    unoptimized: process.env.NODE_ENV === 'production', // For Netlify deployment
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
};

export default nextConfig; 