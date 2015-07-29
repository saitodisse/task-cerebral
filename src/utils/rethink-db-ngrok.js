var request = require('superagent');
var config = require('../config.js');

module.exports = function() {
  // return new Promise((resolve, reject) => {

    if (/.*ngrok\.io/.test(window.location.hostname) ) {
      /**/console.log('\n>>---------\n window.location.hostname:\n', window.location.hostname, '\n>>---------\n');/*-debug-*/
      /**/console.log('\n%% has ngrok \n');/*-debug-*/

      var config_json = require('../config.json');
      var get_http_url = function(data) {
        if(data[0].proto === 'http') {
          return data[0].public_url;
        } else {
          return data[1].public_url;
        }
      }

      // return resolve(get_http_url(config_json['RETHINK-DB-NGROK_URL']))
      return get_http_url(config_json['RETHINK-DB-NGROK_URL']);
    } else {
      /**/console.log('\n%% do not have ngrok \n');/*-debug-*/
      // return resolve(config.rethinkdb_server.host)
      return config.rethinkdb_server.host;
    }

  // })
};
