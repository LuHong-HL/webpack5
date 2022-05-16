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

### [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin#options)
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

### [webpack-merge](https://www.npmjs.com/package/webpack-merge)
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

### [webpack-dev-server](https://www.npmjs.com/package/webpack-dev-server)
- 作用：提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能
- 使用场景：实时重新加载，代理接口地址处理跨域问题
- 安装：`yarn add webpack-dev-server --dev`
- 基础使用 [基础配置api](https://webpack.docschina.org/configuration/dev-server/)
```
// webpack.dev.config.js
const devConfig = {
  devServer: {
    // port: 8080,  // 端口号设置
    static: path.resolve(__dirname, '../dist'), // 告诉服务器从哪里提供静态内容
    // proxy: { // 代理 url 到 服务端同域地址，正式开发项目会用到
    //   '/api': { // 匹配的 url
    //     target: 'http://localhost:3000', // 代理的地址
    //     pathRewrite: { '^/api': '' }, // 重写url
    //   },
    // },
  },
};
```

### 样式问题处理
- 基本配置
  + style-loader: 将css 插入dom中
  + css-loader: css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样
  + 此方式是通过 stlye 的方式引入样式的
  ```
  module: {
    rules: [ // 从下到上，从right 到 left
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  ```

- css 抽离
  + mini-css-extract-plugin: 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
  + 此方式使用 link 的方式引入样式
  + 基础配置
  ```
  // webpack.base.config.js
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        }
      ],
    },
    plugins: [
      new MiniCssExtractPlugin()
    ],
  };
  ```

- 样式预处理配置（scss）
  + sass-loader: 样式预处理，加载 Sass/SCSS 文件并将他们编译为 CSS
  + sass
  + dart-sass
  ```
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  ```
  
  - 通过 postcss 兼容最新的css语法
   + [postcss](https://github.com/postcss/postcss): 通过 js plugins 转换样式的工具
   + [postcss-loader](https://github.com/webpack-contrib/postcss-loader): 配合postcss使用的处理css的loader 
   + [postcss-preset-env](https://github.com/csstools/postcss-preset-env): 允许开发者使用最新的 CSS 语法而不用担心浏览器兼容性
   + [autoprefixer](https://github.com/postcss/autoprefixer): 使用Can I Use中的值向CSS规则添加供应商前缀,postcss-preset-env 集成了 autoprefixer
   + [browserslist](https://github.com/browserslist/browserslist#browserslistrc): 配置目标环境
   + 安装：`yarn add postcss-loader postcss postcss-preset-env --dev`
   + 基础配置:
     - postcss-loader的使用配置  
     ```
     // webpack.base.config.js
     // 在 css-loader之前使用
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
      ],
     }
     ```
     - postcss的配置  
     ```
     // 新建 postcss.config.js 配置文件
     module.exports = {
      plugins: [
        [
          "postcss-preset-env",
          {
            // options 选项
            // stage: 2 // 默认是 2 工作草案阶段
          },
        ],
      ],
     };
     ```
     - 目标环境的配置
     ```
     // 创建 .browserslistrc 配置文件  
     last 2 versions  
     \> 1%  
     not ie <= 8  
     ```
