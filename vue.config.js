const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 9999,
    open: true,
    proxy: {
      '^/apis': {
        target: 'http://127.0.0.1:8000/' // 后端接口-注意重启
      }
    }
    // InitOnSave: false
  }
})
