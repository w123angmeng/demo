module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    '@babel/plugin-syntax-top-level-await', // 此处为新增配置
    // '@babel/plugin-transform-runtime',
  ]
}
