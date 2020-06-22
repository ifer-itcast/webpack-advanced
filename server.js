const express = require('express');
const webpack = require('webpack');
// #1
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const app = express();
// #2
const compiler = webpack(config);

// #3
app.use(webpackDevMiddleware(compiler, {
    publicPath: '/'
}));

app.listen(3000, function () {
    console.log('http://localhost:3000');
});