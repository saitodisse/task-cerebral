var ETCD_HOST = process.env.ETCD_HTTP_HOST;

module.exports = function(key, value) {
  var request = require('superagent');
  request
    .put(ETCD_HOST + '/v2/keys/' + key)
    .send('value=' + value)
    .end(function(err, res){
      console.log('\n>>---------\n etcd:\nres.body:\n', res.body, '\n>>---------\n');
    });
}
