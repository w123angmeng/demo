// webpack.dll.conf.js

// 引入依赖
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空文件用的
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 压缩代码用的

// 具体配置
module.exports = {
  mode: 'production', // 告诉 webpack 当前环境为生产环境
  // 入口 dll 自定义模块名字: [依赖1,依赖2,...] 
  entry: {
    vue: ['vue', 'vue-router', 'vuex'], // 打包 vue、vue-router、vuex依赖打包到一个叫 vue 的dll模块中去
    elementui: ['element-ui'],
    vendor: ['axios']
  },
  // 出口
  output: {
    filename: 'dll.[name].js', // 其中[name]就是entry中的dll模块名字，因此filename就是dll.vue.js
    path: path.resolve(__dirname, './public/dll/js'), // 输出打包的依赖文件到dll/js文件夹中
    library: '[name]_library'// 暴露出的全局变量名，用于给 manifest 映射 
  },
  plugins: [
    // 重新打包时，清除之前打包的dll文件
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, './public/dll/**/*')] // ** 代表文件夹， * 代表文件
    }),
    // 生成 manifest.json 描述动态链接库包含了哪些内容
    new webpack.DllPlugin({
      // 暴露出的dll的函数名；此处需要和 output.library 的值一致
      // 输出的manifest.json中的name值
      name: '[name]_library',
      context: __dirname, // 在项目主要的配置中需要和这保持一致
      // path 指定manifest.json文件的输出路径
      path: path.resolve(__dirname, './public/dll/[name]-manifest.json'),  // DllReferencePlugin使用该json文件来做映射依赖。（这个文件会告诉我们的哪些文件已经提取打包好了）
    }),
    new BundleAnalyzerPlugin(),// 压缩
  ]
}
