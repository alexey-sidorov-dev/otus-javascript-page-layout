const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: devMode ? "development" : "production",

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.css$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },

      {
        test: /\.(png|jpg|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: devMode
            ? "./images/[name][ext]"
            : "./images/[contenthash][ext]",
        },
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(woff|woff2|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: devMode
            ? "./fonts/[name][ext]"
            : "./fonts/[contenthash][ext]",
        },
      },
    ],
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: devMode ? "[name].bundle.js" : "[name].[contenthash].js",
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./index.html"),
    }),
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
          }),
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, `./src/public`),
                to: path.resolve(__dirname, "./dist"),
              },
            ],
          }),
        ]
  ),
};

if (devMode) {
  module.exports.devtool = "eval-cheap-module-source-map";
  module.exports.devServer = {
    compress: true,
    hot: true,
    port: 9000,
    client: {
      logging: "info",
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
    },
  };
}

if (!devMode) {
  module.exports.devtool = false;
  module.exports.optimization = {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  };
}
