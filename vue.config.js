const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
function addStyleResource (rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, 'src/assets/less/var.less')]
    })
}
module.exports = {
  productionSourceMap: false,
  lintOnSave: process.env.NODE_ENV !== 'production',
  // devServer
  devServer: {
    port: 9000
  },
  // Webpack 配置修改
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@libs', resolve('src/libs'))
      .set('@views', resolve('src/views'))
      .set('@config', resolve('src/config'))
      .set('@assets', resolve('src/assets'))
      .set('@imgs', resolve('src/assets/imgs'))
      .set('@store', resolve('src/config/store/index.js'))
      .set('@components', resolve('src/components'))

    // 配置loader
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  },
  // css 编译器
  css: {
    loaderOptions: {
      postcss: {
        options: {
          modules: true
        }
        // plugins: {
        //   autoprefixer: { browsers: 'last 5 version' }
        // }
      },
      less: {
        javascriptEnabled: true
      }
    }
  }
}
