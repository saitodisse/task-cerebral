var request = require('superagent');
var utils_get_rethinkdb_server = require('../utils/get-rethinkdb-server.js');

let removeTaskFromServer = function (args, state, promise) {
	let task = state.get('tasks', args.ref);
	utils_get_rethinkdb_server().then((rethinkdb_server_url) => {
		request
			.post(rethinkdb_server_url + '/task/delete')
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
	});

};

export default removeTaskFromServer;
