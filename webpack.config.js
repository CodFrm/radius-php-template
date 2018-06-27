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
    plugins: [
        new htmlWebpackPlugin({
            filename: __dirname + '/dist/admin.html',
            template: __dirname + '/src/admin.html',
            inject: 'body',
            title: '导入页面',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['admin']
        })
    ]
}