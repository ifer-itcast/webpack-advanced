const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        path: path.join(__dirname, 'dist'), // 必须是绝对路径
        filename: 'bundle.js'
    },
    mode: 'production', // 默认为 production
    // watch: true
    devServer: {
        compress: true,
        hot: true,
        open: true,
        port: 5000,
        // contentBase: 'src'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, 'assets'),
                    to: 'assets' // 会相对于输出路径（dist）进行拼接
                }
            ]
        }),
        new webpack.BannerPlugin('黑马牛逼啊')
    ],
    module: {
        rules: [
            {
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
                test: /\.(png|jpg|gif|webp|woff|woff2|ttf|svg|eot)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 图片大于 5kb 就以路径形式展示，否则 base64
                        limit: 5 * 1024,
                        outputPath: 'image',
                        name: '[name]-[hash:4].[ext]'
                    }
                }]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]
    },
    // 带 eval 不会生成新的映射文件，直接在当前文件中定位
    devtool: 'cheap-module-eval-source-map'
};