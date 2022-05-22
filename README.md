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
### 图片资源处理
- webpack5之前处理loader
  + raw-loader: 将文件导入为字符串
  + url-loader: 将文件作为 data URI 内联到 bundle 中
  + file-loader: 将文件发送到输出目录
  ```
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            outputPath: '/img/'
          }
        }
      }
    ]
  }
  ```
- webpack5的资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader
  + asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
  + asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
  + asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
  + asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
  + 基础配置
  ```
  // webpack.base.config.js
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset', // 在导出一个 data URI 和发送一个单独的文件之间自动选择
        parser: {
            dataUrlCondition: { // 模块大小小于 maxsize，则会被作为一个 Base64 编码的字符串注入到包中，有利于减少http请求
                maxSize: 11 * 1024 // byte
            }
        },
        generator: {
            filename: 'imgs/[name]_[contenthash:8][ext]' // 输出的文件名称
        }
      }
    ]
  }
  ```

  -  Babel 的使用
    + 是什么：Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
    + 使用场景：
      - 语法转换：将ES6版本的JavaScript代码转为ES5等向后兼容的JS代码
      - 补齐API：通过 Polyfill 的方式在目标环境中添加缺失的特性
    + 安装：  
    `yarn add @babel/preset-env  @babel/core  babel-loader @babel/plugin-transform-runtime --dev`
    `yarn add @babel/runtime-corejs3`
    + 基础配置及相应用法解析
    ```
    // babel.config.js
    module.exports = {
      presets: [
        [
          // 安装 @babel/preset-env  @babel/core  babel-loader  core-js@3(配置useBuiltIns,补齐api需要core-js@2或core-js@3包)
          // 此处的api 补齐会污染全局环境的api（前端工程可以使用，npm包，js库不要使用此方式做api补全）, 语法转换会生成内联的辅助函数
          "@babel/preset-env",
        //   {
        //     // targets: {}, // 默认空对象,对所有ES6语法转换成ES5,推荐使用browserslist的配置而很少单独配置@babel/preset-env的targets
        //     useBuiltIns: "usage", // 默认 false,"entry" 根据配置的目标环境找出需要的polyfill进行部分引入, "usage" 会考虑目标环境缺失的API模块，同时考虑我们项目代码里使用到的ES6特性。
        //     corejs: 3, // 默认 2，Babel转码的时候使用的是core-js（core-js@2、core-js@3）版本，需要useBuiltIns设置为'usage'或'entry'时，才会生效
        //     modules: false, // 取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候，取默认值"auto". false 转 esm, auto 转 cjs
        //   },
        ],
      ],
      plugins: [
        [
          // 安装 @babel/plugin-transform-runtime  [ @babel/runtime(不做api补齐使用此包，代替内联辅助函数) | @babel/runtime-corejs3(做api补齐使用此包，且代替内联辅助函数) ]
          // 此处的 api 补齐不会污染全局环境（npm包，js库可以使用此方式做api补齐）, 移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代
          "@babel/plugin-transform-runtime",
          {
            // helpers: true, // 设置是否要自动引入辅助函数包, 默认 true
            corejs: 3, // 设置是否做API转换以避免污染全局环境, 默认 false
            // regenerator: true, // Generator与async转换API 有关, 默认 true
            useESModules: true, // 设置是否使用ES6的模块化用法，默认是 false
            // absoluteRuntime: false, // 自定义@babel/plugin-transform-runtime引入@babel/runtime/模块的路径规则,取值是布尔值或字符串。没有特殊需求，我们不需要修改，保持默认false即可。
            // version: "^7.18.0" // @babel/runtime-corejs3 的版本
          },
        ],
      ],
    };
    ```  
    ```
    // webpack.base.config.js
    module: {
      rules: [
        {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/ // 排除转化的文件夹
        }
      ],
    },
    ```  
    
