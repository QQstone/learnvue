const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: config => {
  //   config.module
  //     .rule('images')
  //     .test(/\.(png|jpe?g|gif|bmp)(\?.*)?$/)
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .options({
  //       limit: 10000,
  //       name: 'img/[name].[hash:7].[ext]'
  //     })
  // }
})
