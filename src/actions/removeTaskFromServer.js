var request = require('superagent');
var utils_get_rethink_server_ngrok = require('../utils/rethink-server-ngrok.js');

let removeTaskFromServer = function (input, state, output) {

	let task = state.get('tasks', input.ref);

	request
		.post(utils_get_rethink_server_ngrok() + '/task/delete')
		.send({
			id: task.id
		})
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err) {
				throw err;
			}
			output.success({
				server_response: res.text
			});
		});

};

export default removeTaskFromServer;
