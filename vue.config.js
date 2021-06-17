const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}


module.exports = {
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // 适配 375 屏幕, 设计图750中量出来的尺寸要 / 2
            // 配置成 37.5 是为了兼容 没有适配 rem 布局的第三方 ui 库
            remUnit: 37.5
          })
        ]
      },
      less: {
        modifyVars: {
          'dropdown-menu-height': '10px',
          hack: `true; @import "${resolve('./src/assets/theme.less')}";`,
        },
      }
    },

  }
}