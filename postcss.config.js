// stage
// 此属性决定了哪些 CSS 特性需要被填充。

// stage 共分为 5 个阶段，分别是：

// stage-0 非官方草案
// stage-1 编辑草案或早期工作草案
// stage-2 工作草案 (默认)
// stage-3 候选版本
// stage-4 推荐标准

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
