const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        a: './src/a.js',
        b: './src/b.js'
    },
    output: {
        path: path.join(__dirname, '..', 'dist'), // 必须是绝对路径
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            chunks: ['index', 'a']
        }),
        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: 'src/a.html',
            chunks: ['a']
        }),
        new HtmlWebpackPlugin({
            filename: 'b.html',
            template: 'src/b.html',
            chunks: ['b']
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.join(__dirname, '..', 'assets'),
                to: 'assets' // 会相对于输出路径（dist）进行拼接
            }]
        }),
        new webpack.BannerPlugin('黑马牛逼啊'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|webp|woff|woff2|ttf|svg|eot)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 图片大于 5kb 就以路径形式展示，否则 base64
                        limit: 5 * 1024,
                        outputPath: 'image',
                        name: '[name]-[hash:4].[ext]',
                        esModule: false
                    }
                }]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            {
                // `require.resolve` 用来获取模块的绝对路径
                test: require.resolve('jquery'),
                use: {
                    loader: 'expose-loader',
                    options: '$'
                }
            }
        ],
    },
};