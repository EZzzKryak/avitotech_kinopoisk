const HTMLWebpackPlugins = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack"); //подключаем webpack для использования встроенного плагина EnvironmentPlugin
const Dotenv = require("dotenv-webpack");

//в зависимости от того, какой скрипт мы запустили
// переменная production получит либо false, либо true
const production = process.env.NODE_ENV === "production";

module.exports = {
  entry: path.resolve(__dirname, "./src/index.tsx"), //путь до папки src изменился
  output: {
    path: path.resolve(__dirname, "./dist"), //путь до папки dist изменился
    filename: production
      ? "static/scripts/[name].[contenthash].js" // добавляем хеш к имени файла, если запускаем в режиме production
      : "static/scripts/[name].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: "static/images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack", "url-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          //в режиме production создаём физический файл в папке dist, в dev режиме добавляем стили в тег style в html-файле
          production ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                mode: "local",
                localIdentName: "[name]__[local]__[hash:base64:5]",
                auto: /\.module\.\w+$/i,
              },
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".json"],
  },
  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, "./public/index.html"), //путь до папки public изменился
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "static/styles/[name].[contenthash].css",
    }),
    //Плагин позволяет установить переменные окружения, можно переопределить переменную из блока script файла package.json
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development", // значение по умолчанию 'development', если переменная process.env.NODE_ENV не передана при вызове сборки
    }),
    new Dotenv(),
  ],
};
