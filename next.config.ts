import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.webm$/i,
      type: 'asset/resource',
    });

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /component/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: { not: [/component/] },
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;
