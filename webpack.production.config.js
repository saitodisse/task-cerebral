var webpack = require('webpack');
var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';
var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
  entry: {
    // split vendor to another file
    vendors: ['react', 'cerebral', 'immutable-store', 'event-emitter'],
    app: path.resolve(__dirname, 'src', 'main.js'),
  },
  // devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.js$/,
      loader: 'babel?optional=es7.decorators',
      exclude: node_modules
    }]
  },
  plugins: [
    // split vendor to another file
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
  ]
};

module.exports = config;
