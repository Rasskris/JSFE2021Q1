const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const mode = process.env.NODE_ENV || "development";

const esLintPlugin = (mode) => mode !== 'development' ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

const plugins = [
  ...esLintPlugin(mode),
  new MiniCssExtractPlugin(),
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/index.html",
  }),
  new CopyPlugin({
    patterns: [
      { from: 'public' },
      // { from: 'src/assets', to: 'assets' },
    ],
  }),
];

module.exports = {
  mode: mode,

  entry: "./src/index.ts",
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "" },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: plugins,

  devtool: "source-map",

  resolve: {
    extensions: [".ts", ".js"],
  },

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: true,
    port: 5500,
  },
};