var request = require('superagent');
var config = require('../config.js');

let loadFromServer = function (args, state, promise) {

	let task = state.get('tasks', args.ref);

	request
		.get(config.rethinkdb_server.host + '/task/get')
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err) {
				throw err;
			}
			var json_response = JSON.parse(res.text);
			promise.resolve({
				tasks: json_response
			});
		});

};

export default loadFromServer;
