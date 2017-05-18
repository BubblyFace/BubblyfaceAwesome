const merge = require('webpack-merge')
const webpack = require('webpack')

const pluginFun = require('./plugin.conf.base')

module.exports = function (env) {

    const base = pluginFun(env)
    if (!base) {
       return null
    }
    return merge(base, {
        devtool: 'source-map',
        output: {
            filename: "[name].[chunkhash:8].bundle.js",
            chunkFilename: "[name].[chunkhash:8].bundle.js",
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true,
                    warnings: false,
                    collapse_vars: true,
                    reduce_vars: true
                },
                output: {comments: false},
                sourceMap: true // default is false
            })
        ]
    })
};