module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {    
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },    
    module: {        
      rules: [    
        {    
          test: /\.tsx?$/,    
          loader: 'ts-loader',    
          exclude: /node_modules/,    
          options: {
            appendTsSuffixTo: [/\.vue$/],    
          }    
        }        
      ]    
    }    
  },
  devServer: {
    port: 8080,
    host: "localhost",
    open: true,
    https: false,
    proxy: {
      "/api": {
        target: "http://192.168.1.200:9091",
        changOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
