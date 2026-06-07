import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: '4kwallpapers.com' },
      { protocol: 'https', hostname: 'images.uzum.uz' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'static.wikia.nocookie.net' },
      { protocol: 'https', hostname: 'wallpaperaccess.com' },
      { protocol: 'https', hostname: 'attackontitan.fandom.com' },
      { protocol: 'https', hostname: 'www.debaser.it' },
      { protocol: 'https', hostname: 'kenuz.uz' },
    ],
  },
};

export default nextConfig;
