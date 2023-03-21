const path = require(`path`)

module.exports = {
  // Target must be serverless
  //target: `serverless`,
  // sass stuff
  sassOptions: {
    includePaths: [path.join(__dirname, `styles`)],
  },
  reactStrictMode: true,
  images: {
    domains: [`cyberbrain.dev`],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    }
    return config
  },
}
