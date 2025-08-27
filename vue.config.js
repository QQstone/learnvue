const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: 'assets',
  configureWebpack:{
    devtool: process.env.NODE_ENV !== "production" ? "source-map" : '',
  }
})
