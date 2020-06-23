const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        compress: true,
        hot: true,
        open: true,
        port: 5000,
        proxy: {
            // 请求 /api/getUserInfo 会转发到 http://localhost:9999/getUserInfo
            '/api': {
                target: 'http://localhost:9999',
                pathRewrite: {
                    '^/api': '' // 抹掉 '/api'
                }
            }
        }
    },
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: 'true'
        })
    ]
});