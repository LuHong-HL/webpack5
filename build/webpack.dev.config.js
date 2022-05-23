const commonConfig = require("./webpack.base.config");
const { merge } = require("webpack-merge");
const path = require('path')

const devConfig = {
  mode: "development",
  devtool: "source-map",
  devServer: {
    // port: 8080,  // 端口号设置
    static: path.resolve(__dirname, '../dist'), // 告诉服务器从哪里提供静态内容
    // proxy: { // 代理 url 到 服务端同域地址，正式开发项目会用到
    //   '/api': { // 匹配的 url
    //     target: 'http://localhost:3000', // 代理的地址
    //     pathRewrite: { '^/api': '' }, // 重写url
    //   },
    // },
    headers: {
      "Access-Control-Allow-Origin": "*" // 允许的源
    }
  },
};

module.exports = merge(commonConfig, devConfig);
