import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        os: false,
      };
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { ProvidePlugin } = require("webpack");
      config.plugins.push(new ProvidePlugin({ Buffer: ["buffer", "Buffer"] }));
    }
    return config;
  },
};

export default nextConfig;
