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
