const merge = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        type: "javascript/auto"
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    disableHostCheck: true,
    port: 3005,
    https: false,
    host: "0.0.0.0",
    public: "0.0.0.0",
    hotOnly: true,
    historyApiFallback: {
      rewrites: [
        { from: /index/, to: "/index.html" },
        { from: /launch/, to: "/launch.html" }
      ]
    },
    proxy: [
      {
        context: ["/fetchFhirUri", "/getfile"],
        target: "http://localhost:8190",
        changeOrigin: true,
        secure: false
      }
    ]
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.SourceMapDevToolPlugin()
  ]
});
