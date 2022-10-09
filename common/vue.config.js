const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
// vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { name } = require('./package');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'development' ? "http://localhost:3003" : 'http://180.76.134.57:3003/',
  devServer: {
    hot: true,
    host: "localhost",
    port: 3003,
    open: true,
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    // injectClient: false
},
  configureWebpack: {
    mode: "development",
    // entry: {
    //     main: './src/main.js'
    // },
    // // cache: {
    // //     type: "memory" // filessystem memory
    // // },
    // resolve: {
        
    //     extensions: [".vue", ".js", "json"],
    //     alias: {
    //         vue$: "vue/dist/vue.esm.js",
    //         "@": resolve("src"),
    //         crypto: false,
    //         stream: false,
    //         assert: false,
    //         http: false
    //     }
    // },
    // output: {
    //     library: `${name}-[name]`,
    //     libraryTarget: 'umd', // 把微应用打包成 umd 库格式
    //     // jsonpFunction: `webpackJsonp_${name}`,
    //     chunkLoadingGlobal: `webpackJsonp_${name}`,
    // },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
        //   {
        //     test: /\.vue$/,
        //     loader: 'vue-loader'
        //   }
        ]
    },
    plugins: [
        // new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        //     // templateParameters: {
        //     //     BASE_URL: `./`
        //     // },
        //     filename: 'entry1.html', // 此处新增
        //     inject: 'body',
        //     // chunks: ['lib_remote','qiankunmain', 'outpNurse','main'],
        //     // chunksSortMode: "manual"
        //     // url: BASE_URL,  //需要这里传参
        // }),
        new ModuleFederationPlugin({
            name: 'lib_remote',
            filename: 'remoteEntry.js',
            // 增加library，一定注意type 是 window
            library: { type: "window", name: "lib_remote"},
            exposes: {
                './CommonDialog': './src/components/CommonDialog.vue'
            },
            // shared: ['vue']
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
    experiments: {
        topLevelAwait: true, // 此处为新增配置
    }
  }
})
