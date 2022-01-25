const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const StyleLintPlugin = require("stylelint-webpack-plugin");

const config = {
  mode: "development",
  devServer: {
    open: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/subpage$/, to: "subpage.html" },
        { from: /./, to: "404.html" },
      ],
    },
    port: 9000,
  },
  plugins: [new StyleLintPlugin()],
};

module.exports = merge(common, config);
