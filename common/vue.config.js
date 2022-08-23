const { defineConfig } = require('@vue/cli-service')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = defineConfig({
    mode: "development",
  transpileDependencies: true,
  publicPath: "http://localhost:3003",
  devServer: {
    hot: true,
    host: "localhost",
    port: 3003,
    open: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
},
  configureWebpack: {
    
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
    },
    plugins: [
        // new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
        new ModuleFederationPlugin({
            name: 'lib_remote',
            filename: 'remoteEntry.js',
            exposes: {
                './CommonDialog': './src/components/CommonDialog.vue'
            },
            // shared: ['vue']
            // shared: {
            //     vue: {
            //         eager: true,
            //         singleton: true,
            //     }
            // }
        })
    ]
  }
})
