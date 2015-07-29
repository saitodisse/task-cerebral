var request = require('superagent');
var utils_get_rethink_server_ngrok = require('../utils/rethink-server-ngrok.js');

let removeTaskFromServer = function (args, state, promise) {

	let task = state.get('tasks', args.ref);

	request
		.post(utils_get_rethink_server_ngrok() + '/task/delete')
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
