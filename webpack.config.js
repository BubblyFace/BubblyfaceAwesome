var path = require('path');
var Webpack = require("webpack");

var moduleName;
var args = process.argv;
for (var i = 0, len = args.length; i < len; i++) {
    if (args[i] == '--module' && i + 1 < len) {
        moduleName = args[i + 1];
        break;
    }
}
if (moduleName == null) {
    console.log("未指定模块名称：使用webpack --module moduleName");
    module.exports = null;
    return;
}

module.exports = {
    // devtool: '#source-map',
    entry: {
        app: ["./src/" + moduleName + "/app.js"],
    },
    output: {
        path: path.join(__dirname, 'dist/' + moduleName),
        filename: "[name].bundle.js",
        publicPath: './'
    },
    module: {
        loaders: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
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
            'mint-ui$': 'mint-ui/lib/mint-ui.common.js',
        },
        root: [
            path.resolve('./src/libs'),
        ],
        extensions: ['', '.js']
    },
    plugins: [
        //提取modules和app中相同的部分到common.bundle.js
        //会导致一个问题，多个插件的require id不一致

        // new Webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     chunks:['modules','app']
        // }),

        new Webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/modules-manifest.json'),
            name: 'modules',
        }),
        // new Webpack.DllReferencePlugin({
        //     context:__dirname,
        //     manifest: require( './dist/libs-manifest.json' ),
        //     name: 'libs',
        // }),
        // new Webpack.DllPlugin({
        //     path: path.join(__dirname, "dist", "[name]-manifest.json"),
        //     name: "[name]"
        // })

    ],
}
