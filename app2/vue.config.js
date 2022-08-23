const {
    defineConfig
} = require('@vue/cli-service')
const packageName = require('./package.json').name;
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = defineConfig({
    publicPath: "http://localhost:3002",
    transpileDependencies: true,
    mode: "development",
    devServer: {
        hot: true,
        host: "localhost",
        port: 3002,
        open: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        output: {
            // library: `${packageName}-[name]`,
            library: 'app2',
            libraryTarget: 'umd',
            // jsonpFunction: `webpackJsonp_${packageName}`,
            chunkLoadingGlobal: `webpackJsonp_${packageName}`,
            clean:true
        },
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
