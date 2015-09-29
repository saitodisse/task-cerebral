var request = require('superagent');
var utils_get_rethink_server_ngrok = require('../utils/rethink-server-ngrok.js');

let loadFromServer = function (input, state, output) {
	request
		.get(utils_get_rethink_server_ngrok() + '/task/get')
		.set('Accept', 'application/json')
		.end(function(err, res){
			if(err) {
				throw err;
			}
			var json_response = JSON.parse(res.text);

			output.success({
	      tasks: json_response
	    });
		});
};

export default loadFromServer;
