const path = require("path");
const HhtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].[chunkhash].js", // hash, contenthash chunkhash
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     injectType: "singletonStyleTag",
          //   },
          // },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
    new HhtmlWebpackPlugin({
      title: "Webppack",
      template: "./template.hbs",
      meta: {
        viewport: "width=device-width, initial-scale=1",
      },
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
      },
    }),
    new CleanWebpackPlugin(),
  ],
};