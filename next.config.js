// Next.config.js
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');

const nextConfig = {
  webpack: (config, options) => {
    // Modify the `config` here

    return config;
  }
};

module.exports = withPlugins(
  [[withImages, {ignoreTypes: ['svg']}], withCSS],
  nextConfig
);
