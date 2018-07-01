var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        admin: __dirname + '/src/admin.js',
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: __dirname + '/dist/admin.html',
            template: __dirname + '/src/admin.html',
            inject: 'body',
            title: '主页面',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['admin']
        }),
        new htmlWebpackPlugin({
            filename: __dirname + '/dist/user.html',
            template: __dirname + '/src/user.html',
            inject: 'body',
            title: '用户管理',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['admin']
        })
    ]
}