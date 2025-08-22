const { defineConfig } = require('@vue/cli-service')
const packageName = require('./package.json').name;

module.exports = defineConfig({
  transpileDependencies: true,
  
  devServer: {
    port: 8081,
    headers: {
      // 微前端需要跨域
      'Access-Control-Allow-Origin': '*'
    }
  },
  configureWebpack: {
    output: {
      library: `${packageName}-[name]`, // [name]是打包时trunk名称的占位符
      libraryTarget: 'umd', // Universal Module Definition通用模块定义
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
    }
  }
})
