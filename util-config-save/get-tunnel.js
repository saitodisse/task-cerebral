var request = require('superagent');
var BB = require('bluebird');

module.exports = function(ngrok_api) {
  return new BB(function(resolve, reject) {
    request
    .get(ngrok_api + '/api/tunnels') // get ngrok tunnel by local API
    .set('Accept', 'application/json')
    .end(function(err, res){
      if(err) {
        return reject(err);
      }
      var json_response = JSON.parse(res.text);
      return resolve(json_response.tunnels);
      var obj = {
        api: ngrok_api,
        tunnels: json_response.tunnels
      };
      return resolve(obj);
    });
  });

}
