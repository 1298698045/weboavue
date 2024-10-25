module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/',  // 确保静态资源的根路径正确
  outputDir: 'dist',  // 构建输出目录
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.200:9091/api',
        // target: 'http://localhost:85/api',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      '/_ui': {
        target: 'http://192.168.1.200:9091/_ui',
        // target: 'http://localhost:85/api',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/_ui": "",
        },
      },
    }
  },
  chainWebpack: config => {
    config.resolve.extensions.add('.bcmap');
    config.resolve.extensions.add('.mjs');
    config.resolve.extensions.add('.ftl');
  },
  configureWebpack:{
    resolve:{
      extensions:['.js','.vue','.json','.bcmap','.mjs','.ftl'],
      //设置文件查找路径
      // alias:{
      //   'vue$':'vue/dist/vue.esm.js',
      //   '@':resolve('src'),
      //   'components':resolve('src/components'),
      // }
    },
  },
};
