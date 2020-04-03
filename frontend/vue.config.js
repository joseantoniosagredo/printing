module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath:'/pedidos',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost',
        ws: true,
        changeOrigin: true
      },
    }
  }
}