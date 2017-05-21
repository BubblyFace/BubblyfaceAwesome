const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const urls = require('./tools/urls')

const webpackConfBase = require('./conf.base')

module.exports = function (env) {
    if (!env || !env.module) {
        console.log("未指定模块名称，使用：npm run dev|prod -- --env.module moduleName")
        return null
    }
    urls.moduleSrcPath = path.join(urls.rootPath, 'src/' + env.module)
    urls.moduleDistPath = path.join(urls.rootPath, 'dist/' + env.module)

    return merge(webpackConfBase, {
        entry: {
            app: path.join(urls.moduleSrcPath, 'app.js')
        },
        output: {
            path: urls.moduleDistPath,
            filename: "[name].bundle.js",
            chunkFilename: "[name].bundle.js",
            publicPath: './'
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: urls.rootPath,
                manifest: require('../dist/modules-manifest.json'),
                name: 'modules',
            }),
            // new HtmlWebpackPlugin({
            //     chunks: ['app'],
            //     inject: 'body',
            //     template: path.join(urls.moduleSrcPath, 'index.html')
            // })
        ]
    })
}