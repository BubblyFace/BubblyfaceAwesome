var path = require('path');
var Webpack = require("webpack");
module.exports = {
    entry: {
        modules: ['element-ui/lib/theme-default/index.css', './lib/font-awesome.min.css', 'vue', 'element-ui', 'vue-resource', 'vue-router', 'vuex'],
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].dll.js",
        library: '[name]'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
            loader: 'file-loader',
            query: {
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        alias: {
            //别名，这样require('vue')时会加载下面的文件
            'vue$': 'vue/dist/vue.js',
        },
        extensions: ['', '.js'],
    },
    plugins: [
        new Webpack.DllPlugin({
            path: path.join(__dirname, "dist", "[name]-manifest.json"),
            name: "[name]"
        }),
        // new Webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
}
