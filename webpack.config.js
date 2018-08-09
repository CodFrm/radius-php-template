var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: {
        admin: __dirname + '/src/js/admin.js',
        login: __dirname + '/src/js/login.js'
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

            }, {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.common.js',
            'vue-router': 'vue-router/dist/vue-router.common.js'
        }
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: __dirname + '/dist/admin.html',
            template: __dirname + '/src/admin.html',
            inject: 'body',
            title: '后台管理页面',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: ['admin', 'vendors', 'manifest']
        }),
        new htmlWebpackPlugin({
            filename: __dirname + '/dist/login.html',
            template: __dirname + '/src/login.html',
            inject: 'body',
            title: '登录页面',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunksSortMode: 'dependency',
            chunks: ['admin', 'login', 'vendors', 'manifest']
        }),
        new VueLoaderPlugin()
    ]
}