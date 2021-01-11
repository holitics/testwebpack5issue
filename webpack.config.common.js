const path = require("path");
const glob = require('glob');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ContextReplacementPlugin = require('webpack').ContextReplacementPlugin;
const DefinePlugin = require('webpack').DefinePlugin;
const ProvidePlugin = require('webpack').ProvidePlugin;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    launch: path.resolve(__dirname, "src/launch.js"),
    index: {
      import: path.resolve(__dirname, "src/index.js"),
//	  dependOn: 'fhirclient'
    },
    fhirclient: path.resolve(__dirname, "node_modules/fhirclient/"),
  },
  plugins: [
    new ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
    new DefinePlugin({
      'process.env.REACT_APP_EPIC_SUPPORTED_QUERIES': JSON.stringify('true'),
    }),
    new ProvidePlugin({
      process: 'process/browser', // require "process" library, fix "process is not defined" error, source: https://stackoverflow.com/a/64553486
      Buffer: ['buffer', 'Buffer'] // require "buffer" library, fix "Buffer is not defined" error, source: https://github.com/webpack/changelog-v5/issues/10#issuecomment-615877593
    })
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
    globalObject: `(typeof self !== "undefined" ? self : this)`
  },
  optimization: {
//    runtimeChunk: 'single',
//    splitChunks: {
//      chunks: 'all',
//    },
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        extractComments: false,
        terserOptions: {
          format: {
            preamble: false,
            comments: false,
          },
          compress: {
            drop_console: true
          },
          keep_classnames: true,
          keep_fnames: true
        }
      })
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"],
    alias: {
      fs$: path.resolve(__dirname, "node_modules/pdfkit/js/virtual-fs.js")
    },
    aliasFields: ['browser'],
    fallback: {
      fs: false,
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
      assert: require.resolve('assert/'),
      timers: require.resolve("timers-browserify")
    }
  },
  module: {
    rules: [
      // following are needed for PDFKit
      { enforce: 'post', test: /fontkit[/\\]index.js$/, loader: "transform-loader", options: "brfs" },
      { enforce: 'post', test: /unicode-properties[/\\]index.js$/, loader: "transform-loader", options: "brfs" },
      { enforce: 'post', test: /linebreak[/\\]src[/\\]linebreaker.js/, loader: "transform-loader", options: "brfs" },
      { test: /src[/\\]assets/, loader: 'arraybuffer-loader'},
      { test: /\.afm$/, loader: 'raw-loader'},
      {
        // bit of a hack to ignore the *.js.map files included in cql-execution (from coffeescript)
        test: /\.js.map$/,
        include: [path.resolve(__dirname, "node_modules/cql-execution/lib")],
        use: { loader: "ignore-loader" }
      },
      {
        test: /\.(mjs|js|jsx)$/,
        type: "javascript/auto",
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          }
        ]
      }
    ]
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  }
};
