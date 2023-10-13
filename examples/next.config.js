const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
});

module.exports = {
  ...withNextra(),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  basePath: "/react-grid-gallery",
  assetPrefix: "/react-grid-gallery/",
  images: {
    unoptimized: true,
  },
};
