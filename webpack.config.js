const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const { NODE_ENV } = process.env;
const devMode = NODE_ENV === "development";
const prodMode = NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: NODE_ENV,

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
          "postcss-loader",
        ],
      },

      {
        test: /\.(png|jpg)$/i,
        type: "asset/resource",
        generator: {
          filename: devMode
            ? "./images/[name][ext]"
            : "./images/[contenthash][ext]",
        },
      },

      {
        test: /\.svg$/i,
        type: "asset/inline",
      },

      {
        test: /\.txt$/i,
        type: "asset/source",
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
      template: path.resolve(__dirname, "./public/index.html"),
      favicon: path.resolve(__dirname, "./src/images/favicon.svg"),
    }),
  ],
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

if (prodMode) {
  module.exports.devtool = false;
  module.exports.plugins?.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public/robots.txt"),
          to: path.resolve(__dirname, "./dist"),
        },
      ],
    }),
  );
  module.exports.optimization = {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
  };
}
