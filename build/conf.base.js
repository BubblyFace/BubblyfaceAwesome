const path = require('path')
const urls = require('./tools/urls')
const webpack = require('webpack')
process.noDeprecation = true

module.exports = {
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\/|baiduMap.js/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2']
            }
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                //不设置大小，存为base64
                name: 'public/font/[name].[ext]'
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                limit: 8192,
                name: 'public/images/[hash:7].[name].[ext]'
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            'vue-router': 'vue-router/dist/vue-router.js',
            'vue-resource': 'vue-resource/dist/vue-resource.common.js',
            'jquery': 'jquery'
        },
        modules: [
            path.join(urls.rootPath, 'src/libs'),
            "node_modules"
        ],
        extensions: ['.js']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
}
