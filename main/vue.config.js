const {
    defineConfig
} = require('@vue/cli-service')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
const webpack = require("webpack");
// import debug from 'webpack'
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
// vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const VueLoaderPlugin = require('vue-loader/dist/plugin')
// const { VueLoaderPlugin } = require('vue-loader') 
// const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const { name } = require('./package');
module.exports = defineConfig({
    transpileDependencies: true,
    // publicPath: "http://localhost:3000",
    outputDir: 'dist',
    devServer: {
        hot: true,
        host: "localhost",
        port: 3000,
        open: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: config=> {
        // injectClient: false,
        
        // config.mode= "development"
        config.mode ="production"
        config.entry = {
            main: './src/main.js'
        }
        Object.assign(
            config.resolve, {
                extensions: [".vue", ".js", "json"],
                alias: {
                    vue$: "vue/dist/vue.esm.js",
                    "@": resolve("src"),
                    crypto: false,
                    stream: false,
                    assert: false,
                    http: false
                }
            }
        )
        // config.devtool = 'source-map'
        config.module.rules.push({
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            sideEffects: true
        })

        // config.output = {
        //     library: `${name}-[name]`,
        //     libraryTarget: 'umd', // 把微应用打包成 umd 库格式
        //     // jsonpFunction: `webpackJsonp_${name}`,
        //     chunkLoadingGlobal: `webpackJsonp_${name}`,
        // }

        
        // cache: {
        //     type: "memory" // filessystem memory
        // },
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
        
        
        console.log("====type:",  typeof ['vue1', 'elementui', 'vendor'])
        let pArr = ['vue', 'elementui', 'vendor']
        pArr.map(item => {
            console.log("item:", item, `/public/dll/${item}-manifest.json`)
            config.plugins.push(new webpack.DllReferencePlugin({
                // context: path.resolve(__dirname, './'),
                context: process.cwd(),
                manifest: require(`./public/dll/${item}-manifest.json`)
            }))
            // config.plugins.push(new AddAssetHtmlPlugin({
            //         // 引用的dll.js文件位置 dll.elementui.js
            //         // filepath: path.resolve(__dirname, `./public/dll/js/dll.${item}.js`).toLowerCase(),
            //         filepath: require.resolve(path.resolve(__dirname, `./public/dll/js/dll.${item}.js`)),
            //         //  publicPath: '/vendor',
            //         //  outputPath: '/vendor',
            //         // dll 引用路径 对dll静态资源引用的位置
            //         publicPath: '/dll/js/',
            //         // dll最终输出的目录 打包后具体在dist下的文件位置
            //         outputPath: '/dll/js/',
            //          includeSourcemap: false
            //     })
            // )
        }),
        config.plugins.push( new HtmlWebpackTagsPlugin({
            scripts: ['dll/js/dll.vue.js', 'dll/js/dll.elementui.js', 'dll/js/dll.vendor.js'], 
            append: false
        }))
        // console.log("pArr:", pArr.length,pArr, path.resolve(__dirname, './public/dll/js/*.js'))
        // config.plugins.push(
        //     new AddAssetHtmlPlugin({
        //          // 引用的dll.js文件位置 dll.elementui.js
        //          filepath: path.resolve(__dirname, `./public/dll/js/**/*.js`),
        //         // filepath: path.resolve(__dirname, `./public/dll/js/dll.elementui.js`),
        //          publicPath: '/vendor',
        //          outputPath: '/vendor',
        //          // dll 引用路径 对dll静态资源引用的位置
        //         //  publicPath: '/dll/js/',
        //          // dll最终输出的目录 打包后具体在dist下的文件位置
        //         //  outputPath: '/dll/js/',
        //          includeSourcemap: false
        //         //  includeSourcemap: false
        //     })
        // )



        // pArr.forEach(item => {
        //     console.log("item:", item)
        //     config.plugins.push(new webpack.DllReferencePlugin({
        //         context: __dirname,
        //         manifest: require(path.resolve(__dirname, `/public/dll/${item}-manifest.json`))
        //     }))
        // })
        // config.plugins.push(
        //     new AddAssetHtmlPlugin({
        //         // 引用的dll.js文件位置
        //         filepath: path.resolve(__dirname, './public/dll/js/*.js'),
        //         // dll 引用路径 对dll静态资源引用的位置
        //         publicPath: './dll/js/*.js',
        //         // dll最终输出的目录 打包后具体在dist下的文件位置
        //         outputPath: './dll/js/*.js',
        //         includeSourcemap: false
        //       })
            // new HTMLWebpackPlugin({
            //     template: path.resolve(__dirname, './public/index.html'),
            //     filename: 'entry.html',
            //     chunks: ['lib_remote','main'],
            //     chunksSortMode: "manual"
            // })
            // new CleanWebpackPlugin(),
            // new HtmlWebpackPlugin({
            //     template: './public/index.html',
            //     // templateParameters: {
            //     //     BASE_URL: `./`
            //     // },
            //     filename: 'entry2.html', // 此处新增
            //     inject: 'body', // true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中
            //     // url: BASE_URL,  //需要这里传参
            //     // chunksSortMode:'manual',
            //     // chunksSortMode: 'dependency'
            //     // chunksSortMode: 'auto'
            //     chunks: ['lib_remote','app2'],
            //     chunksSortMode: "manual"
            // }),
            // new ModuleFederationPlugin({
            //     name: 'main_app',
            //     filename: 'remoteEntry.js',
            //     remotes: {
            //         lib_remote: `lib_remote@http://localhost:3003/remoteEntry.js`
            //     },
            //     // shared: {
            //     //     vue: {
            //     //         eager: true,
            //     //         singleton: true,
            //     //     }
            //     // }
            // })
        // )
        // optimization: {
        //     // splitChunks: false
        //     nodeEnv: false,
        //     // sideEffects: true,
        // },
        // // experiments: {
        // //     topLevelAwait: true, // 此处为新增配置
        // // },
        // experiments: {
        //     topLevelAwait: true, // 此处为新增配置
        // }
    }
})