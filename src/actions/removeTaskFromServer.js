var request = require('superagent');
var config = require('../config.js');

let removeTaskFromServer = function (args, state, promise) {
	let task = state.get('tasks', args.ref);
	request
		.post(config.rethinkdb_server.host + '/task/delete')
		.send({
			id: task.id
		})
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err) {
				console.error(res.text);
				promise.reject(err);
			}
			promise.resolve(res.text);
		});

};

export default removeTaskFromServer;
