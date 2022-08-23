const {
    defineConfig
} = require('@vue/cli-service')
const path = require('path');
// vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const VueLoaderPlugin = require('vue-loader/dist/plugin')
const { VueLoaderPlugin } = require('vue-loader') 
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        hot: true,
        host: "localhost",
        port: 3000,
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
            new HTMLWebpackPlugin({
                template: path.resolve(__dirname, './public/index.html'),
                filename: 'entry.html'
            }),
            // new CleanWebpackPlugin(),
            new ModuleFederationPlugin({
                name: 'main_app',
                filename: 'remoteEntry.js',
                remotes: {
                    lib_remote: `lib_remote@http://localhost:3003/remoteEntry.js`
                },
                shared: {
                    vue: {
                        eager: true,
                        singleton: true,
                    }
                }
            })
        ],
        optimization: {
            splitChunks: false
        },
    }
})