const path = require("path"); // 引入node的 path 模块
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const { ModuleFederationPlugin } = require('webpack').container; // 模块联邦

module.exports = {
  entry: "./src/index.js", // webpack 入口，可多个入口，出口只能一个
  output: {
    // webpack的出口
    filename: "[name].[contenthash].js", // 出口文件名以及可替换的模板字符串
    path: path.resolve(__dirname, "../dist"), // 出口路径
    clean: true, // 在生成文件之前清空 output 目录
  },
  module: {
    rules: [
      // 从下到上，从right 到 left
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset', // 在导出一个 data URI 和发送一个单独的文件之间自动选择
        parser: {
            dataUrlCondition: { // 模块大小小于 maxsize，则会被作为一个 Base64 编码的字符串注入到包中，有利于减少http请求
                maxSize: 11 * 1024 // 单位 byte
            }
        },
        generator: {
            filename: 'imgs/[name]_[contenthash:8][ext]' // 输出的文件名称
        }
      },
      {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/ // 排除转化的文件夹
      }
    ],
  },
  plugins: [
    // 插件配置
    new HtmlWebpackPlugin({
      // Generate an HTML5 file with a script tag in the body to include all your webpack-generated bundles
      template: "./index.html", // 使用html的模板路径
    }),
    new MiniCssExtractPlugin(),
    // new ModuleFederationPlugin({ // 模块联邦
    //     name: "componentApp",
    //     filename: "remoteEntry.js",
    //     library: {
    //         type: 'var',
    //         name: 'componentApp'
    //     },
    //     exposes: {
    //         './Head': './src/head/index.js',
    //         './ImgTest': './src/imgTest/index.js'
    //     }
    // })
  ],
};
