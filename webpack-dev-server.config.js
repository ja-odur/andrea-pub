var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./webpack.base.config.js');


// override django's STATIC_URL for webpack bundles
config.output.publicPath = `${process.env.REACT_APP_BASE_STATIC_URL}frontend/static/bundles/`;

config.devServer = {
        port: 3000,
        headers: { 'Access-Control-Allow-Origin': '*' },
        compress: true,
        hot: true,
        host:'0.0.0.0',
        publicPath: config.output.publicPath,
    };

// Add HotModuleReplacementPlugin and BundleTracker plugins
config.plugins =  config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
    ]);

// Add a loader for JSX files with react-hot enabled
config.module.rules.push(
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['react-hot-loader/webpack', 'babel-loader']
  }
);

module.exports = config;
