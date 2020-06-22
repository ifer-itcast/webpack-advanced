const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        path: path.join(__dirname, 'dist'), // 必须是绝对路径
        filename: 'bundle.js'
    },
    mode: 'development', // 默认为 production
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
        })
    ]
};