# webpack 项目搭建关键点

### 项目基本使用命令
- 构建开发环境：`yarn build:dev`
- 构建生产环境：`yarn build`

### 项目初始化
- `yarn init` 创建package.json 文件
- `git init` 初始化git仓库
  + 添加.gitignore 忽略 node_modules 等文件
- `yarn add webpack webpack-cli --dev` 安装webpack相关包
  + 创建webpack.config.js文件配置webpack配置，包括webpack入口和出口
  ```
    const path = require("path"); // 引入node的 path 模块
    module.exports = {
    mode: "production", // 设置webpack的运行环境 
    entry: "./src/index.js", // webpack 入口，可多个入口，出口只能一个
    output: { // webpack的出口
        filename: "[name].[contenthash].js", // 出口文件名以及可替换的模板字符串
        path: path.resolve(__dirname, "./dist"), // 出口路径
        clean: true, // 在生成文件之前清空 output 目录
    },
    };
  ```

### npm 和 yarn 安装开依赖的使用区别
- npm方式安装
```
// dependencies, devDependencies, peerDependencies, optionalDependencies
npm install [package]
npm install [package] --save-dev
npm install [package] --save-peer
yarn install [package] --save-optional
```

- yarn方式安装
```
// dependencies, devDependencies, peerDependencies, optionalDependencies
yarn add [package]
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

### [HtmlWebpackPlugin 插件](https://github.com/jantimon/html-webpack-plugin#options)
- 作用：生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
- 安装：`yarn add html-webpack-plugin --dev`
- 基本用法
```
// webpack.config.js
{
  plugins: [
    new HtmlWebpackPlugin({
      filename: "[name].html", // 配置输出的html文件名
      template: "./index.html", // 使用html的模板路径
    })
  ]
}
```

### [webpack-merge 插件](https://www.npmjs.com/package/webpack-merge)
- 作用：配置文件拆分之后，进行配置合并
- 使用场景：将不同环境的配置文件分离之后，需要将基础配置和相对应的环境配置进行合拼时
- 安装：`yarn add webpack-merge --dev`
- 基本用法
  + 把webpack.config.js文件的配置进行拆分，分为webpack.base.config.js(基础文件配置)、webpack.dev.config.js(开发环境配置)、webpack.prod.config.js(正式环境配置)，放到build文件夹行统一管理
  + 在packge.json中配置script命令，使用 --config [配置路径] 的方式引入不同的配置。例：
  ```
  // packge.json
  "build": "webpack --config ./build/webpack.prod.config.js"
  ```
  + 配置文件中通过 webpack-merge 合并不同的配置文件。例：
  ```
  // webpack.prod.config.js
  const commonConfig = require("./webpack.base.config");
  const { merge } = require("webpack-merge");

  const prodConfig = {
    mode: "production",
  };

  module.exports = merge(commonConfig, prodConfig);
  ```
