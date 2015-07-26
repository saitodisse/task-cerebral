var request = require('superagent');
var utils_get_rethinkdb_server = require('../utils/get-rethinkdb-server.js');

let saveTask = function (args, state, promise) {

	let task = state.get('tasks', args.ref);

	utils_get_rethinkdb_server().then((rethinkdb_server_url) => {
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
