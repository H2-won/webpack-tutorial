const path = require("path");
const HhtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    postcssOptions: {
      plugins: [
        [
          "autoprefixer",
          {
            // Options
          },
        ],
      ],
    },
  },
};
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js", // hash, contenthash chunkhash
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        oneOf: [
          // filename.module.scss => css modules / filename.scss => global (모듈 적용 x)
          {
            test: /\.module\.s?css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
              postcssLoader,
              "sass-loader",
            ],
          },
          {
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              postcssLoader,
              "sass-loader",
            ],
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name() {
                if (!isProduction) {
                  return "[path] [name].[ext]";
                }
                return "[contenthash].[ext]";
              },
              publicPath: "assets/",
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
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
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          }
        : false,
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction,
    }),
  ],
};
