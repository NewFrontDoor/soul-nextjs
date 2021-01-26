// Next.config.js
const withPlugins = require('next-compose-plugins');
const withFonts = require('next-fonts');

const nextConfig = {
  webpack: (config, _options) => {
    // Modify the `config` here

    return config;
  }
};

module.exports = withPlugins([withFonts], nextConfig);
