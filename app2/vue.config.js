const {
    defineConfig
} = require('@vue/cli-service')
const path = require('path')
const resolve = (p) => path.resolve(__dirname, p)
const packageName = require('./package.json').name;
// vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入模块联邦
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
module.exports = defineConfig({
    publicPath: "http://localhost:3002",
    transpileDependencies: true,
    devServer: {
        hot: true,
        host: "localhost",
        port: 3002,
        open: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        // injectClient: false
    },
    configureWebpack: {
        mode: "development",
        devtool: 'source-map',
        entry: {
            main: './src/main.js'
        },
        // cache: {
        //     type: "memory" // filessystem memory
        // },
        resolve: {
            extensions: [".vue", ".js", "json"],
            alias: {
                vue$: "vue/dist/vue.esm.js",
                "@": resolve("src"),
                crypto: false,
                stream: false,
                assert: false,
                http: false
            }
        },
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
            //     {
            //         test: /bootstrap\.js$/,
            //         loader: 'bundle-loader',
            //         options: {
            //           lazy: true,
            //         },
            //       },
            //   {
            //     test: /\.vue$/,
            //     loader: 'vue-loader'
            //   }
            ]
        },
        plugins: [
            // new VueLoaderPlugin(),
            // new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
                // templateParameters: {
                //     BASE_URL: `./`
                // },
                filename: 'entry2.html', // 此处新增
                inject: 'body', // true | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中
                // url: BASE_URL,  //需要这里传参
                // chunksSortMode:'manual',
                // chunksSortMode: 'dependency'
                // chunksSortMode: 'auto'
                chunks: ['lib_remote','remoteEntry','app','main','src_bootstrap_js'],
                chunksSortMode: "manual"
            }),
            // new ModuleFederationPlugin({
            //     name: 'app2_app',
            //     filename: 'remoteEntry.js',
            //     remotes: {
            //         lib_remote: `lib_remote@http://localhost:3003/remoteEntry.js`
            //     },
            //     // shared: ['vue']
            //     // shared: {
            //     //     vue: {
            //     //         eager: true,
            //     //         singleton: true,
            //     //     }
            //     // }
            // })
        ],
        optimization: {
            nodeEnv: false
            // splitChunks: false
        },
    }
})
