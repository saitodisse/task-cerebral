var request = require('superagent');
var utils_get_rethink_server_ngrok = require('../utils/rethink-server-ngrok.js');

let saveTask = function (input, state, output) {

	let task = state.get('tasks', input.ref);

	request
		.put(utils_get_rethink_server_ngrok() + '/task/new')
		.send({
			title: task.title
		})
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err) {
				throw err;
			}
			var json_response = JSON.parse(res.text);
			output.success(json_response);
		});

};

export default saveTask;
