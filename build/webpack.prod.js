const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
module.exports = merge(baseConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: 'false'
        })
    ]
});