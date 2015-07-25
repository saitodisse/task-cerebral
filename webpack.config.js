var webpack = require('webpack');
var path = require('path');
// var isProduction = process.env.NODE_ENV === 'production';
var node_modules = path.resolve(__dirname, 'node_modules');

var webpack_dev_server_client_url;
var WEBPACK_HOST = process.env.HOST_NAME || '0.0.0.0';
var WEBPACK_PORT = parseInt(process.env.PORT) || 8080;

if (WEBPACK_HOST === '0.0.0.0') {
	webpack_dev_server_client_url = 'webpack-dev-server/client?http://' + WEBPACK_HOST + ':' + WEBPACK_PORT;
} else {
	webpack_dev_server_client_url = 'webpack-dev-server/client?http://' + WEBPACK_HOST;
}

var config = {
	entry: {
    // split vendor to another file
    vendors: ['react', 'cerebral', 'immutable-store', 'event-emitter'],
		webpack_dev_server_client_url: webpack_dev_server_client_url,
		dev_server: 'webpack/hot/dev-server',
		app: path.resolve(__dirname, 'src/main.js')
	},
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
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'env': {
				'SERVER-RDB_URL': process.env['SERVER-RDB_URL']
			}
		}),
    // split vendor to another file
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
	]
};

module.exports = config;
