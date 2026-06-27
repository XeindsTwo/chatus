import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.lottie$/,
      type: 'asset/resource',
    });
    config.module.rules.push({
      test: /\.svg$/,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;
