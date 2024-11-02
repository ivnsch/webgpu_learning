// next.config.js
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.wgsl$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
