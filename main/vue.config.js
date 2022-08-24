const {
    defineConfig
} = require('@vue/cli-service')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { name } = require('./package');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = defineConfig({
    // mode: "development",
    transpileDependencies: true,
    // publicPath: "http://localhost:3000",
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
        // output: {
        //     library: `${name}-[name]`,
        //     libraryTarget: 'umd', // 把微应用打包成 umd 库格式
        //     // jsonpFunction: `webpackJsonp_${name}`,
        //     chunkLoadingGlobal: `webpackJsonp_${name}`,
        // },
        // // output: {
        // //     filename: 'bundles.js',
        // //     path: path.join(process.cwd(), '/dist'),
        // //     // publicPath: 'http://localhost:3000/'
        // //   },
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
        // optimization: {
        //     splitChunks: false
        // },
    }
})