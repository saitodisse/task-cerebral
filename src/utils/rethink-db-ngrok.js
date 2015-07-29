var request = require('superagent');
var config = require('../config.js');

module.exports = function() {
  if (/.*ngrok\.io/.test(window.location.hostname) ) {
    var get_http_url = function(data) {
      if(data[0].proto === 'http') {
        return data[0].public_url;
      } else {
        return data[1].public_url;
      }
    }
    return get_http_url(config['RETHINK-DB-NGROK_URL']);
  } else {
    return config.rethinkdb.host;
  }
};
