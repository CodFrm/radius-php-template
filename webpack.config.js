var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        admin: __dirname + '/src/admin.js',
        user: __dirname + '/src/user.js',
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        extractCSS: true
                    }
                }]
            }, {
                test: /\.(eot|woff|woff2|ttf|svg)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: 'font/[name]-[hash:8].[ext]'
                    }
                }]

            }
        ]
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
            chunks: ['admin', 'vendors', 'manifest']
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
            chunksSortMode: 'dependency',
            chunks: ['user', 'vendors', 'manifest']
        }),
        new VueLoaderPlugin()
    ]
}