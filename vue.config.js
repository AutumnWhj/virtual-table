module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/acho-virtual-table-list" : "/",
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:4000/',
          changeOrigin: true,
          secure: false
        }
      }
    }
};
