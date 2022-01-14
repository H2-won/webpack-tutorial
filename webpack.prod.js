const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  plugins: [],
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/][node_modules[\\/]/,
          name: "venders",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserWebpackPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          level: {
            1: {
              roundingPrecision: "all=3,px=5",
            },
          },
        },
        minify: CssMinimizerPlugin.cleanCssMinify,
      }),
    ],
    minimize: true,
  },
  mode: "production",
};

module.exports = merge(common, config);
