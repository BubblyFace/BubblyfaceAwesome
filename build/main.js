const fs = require('fs')

const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const urls = require('./tools/urls')

const webpackConfBase = require('./conf.base')
const webpackConf = merge(webpackConfBase, {
    devtool: '#eval-source-map',
    entry: {
        modules: [
            'element-ui/lib/theme-default/index.css',
            './lib/font-awesome.min.css',
            'vue',
            'element-ui',
            'vue-resource',
            'vue-router',
            'vuex',
        ],
    },
    output: {
        path: path.join(urls.rootPath, 'dist'),
        filename: "[name].dll.js",
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(urls.distPath, "[name]-manifest.json"),
            name: "[name]"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false,
                collapse_vars: true,
                reduce_vars: true
            },
            output: {comments: false},
            sourceMap: true // default is false
        }),
    ]
})

// fs.writeFileSync(path.join(webpackConfBase.urls.distPath, '/config.dev.json'), JSON.stringify(webpackConf, null, 2), 'utf8')

module.exports = webpackConf;