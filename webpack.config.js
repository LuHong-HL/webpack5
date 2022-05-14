const path = require("path"); // 引入node的 path 模块
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production", // 设置webpack的运行环境
  entry: "./src/index.js", // webpack 入口，可多个入口，出口只能一个
  output: {
    // webpack的出口
    filename: "[name].[contenthash].js", // 出口文件名以及可替换的模板字符串
    path: path.resolve(__dirname, "./dist"), // 出口路径
    clean: true, // 在生成文件之前清空 output 目录
  },
  plugins: [
    // 插件配置
    new HtmlWebpackPlugin({
      // 生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
      filename: "[name].html", // 配置输出的html文件名
      template: "./index.html", // 使用html的模板路径
    }),
  ],
};
