// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: {
      url: "/",
    }
  },
  optimize: {
    bundle: true,
    minify: true,
    splitting: true,
    treeshake: true,
    sourcemap: true,
  },
  plugins: [
    ["@snowpack/plugin-dotenv"]
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    port: 3000
  },
  buildOptions: {
    clean: true,
    sourcemap: true,
  },
};
