var request = require('superagent');
var utils_get_rethink_server_ngrok = require('../utils/rethink-server-ngrok.js');

let saveTask = function (args, state, promise) {

	let task = state.get('tasks', args.ref);

	utils_get_rethink_server_ngrok().then((rethinkdb_server_url) => {
		request
			.put(rethinkdb_server_url + '/task/new')
			.send({
				title: task.title
			})
			.set('Accept', 'application/json')
			.end(function(err, res){
				if(err) {
					throw err;
				}
				var json_response = JSON.parse(res.text);
				promise.resolve(json_response);
			});
	});


};

export default saveTask;
