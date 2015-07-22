var Webpack = require('webpack');
var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';
var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    path.resolve(__dirname, 'src/main.js')
  ],
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'src'),
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
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
