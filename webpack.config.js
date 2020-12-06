const path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

var config = require('./webpack.base.config.js');

config.entry = './frontend/index.js'

config.output.path = path.resolve('./frontend/static/webpack_bundles/')

// Add BundleTracker plugin
config.plugins =  config.plugins.concat([
        new BundleTracker({filename: './webpack-stats.json'}),
    ]);

// Add a loader for JSX files
config.module.rules.push(
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  }
);

module.exports = config;
