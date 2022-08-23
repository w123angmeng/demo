const { defineConfig } = require('@vue/cli-service')
// vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = defineConfig({
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
    mode: "development",
    devtool: 'source-map',
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
        new VueLoaderPlugin(),
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
