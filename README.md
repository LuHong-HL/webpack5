# webpack 项目搭建关键点

### 初始化
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
