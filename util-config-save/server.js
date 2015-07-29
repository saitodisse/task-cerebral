// Import express and co
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var fsAsync = require('file-async');
var getTunnel = require('./get-tunnel');

var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}

// app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser());
app.use(allowCrossDomain);

app.route('/').get(get);

function handleError(res) {
  return function(error) {
    return res.send(500, {error: error.message});
  };
}

// Retrieve all tasks
function get(req, res, next) {
  res.send(res);
  next();
}

// print ENVs
console.log('\n>>---------\n ENVs:\n',
  require('util').inspect(process.env,
  { showHidden: false, depth: null, colors: true }), '\n>>---------\n');

var CONFIG_JSON_FILE_PATH = '../src/config.json';

var all_json_tunnels = {};
getTunnel(process.env['RETHINK-EXPRESS-NGROK_URL'])
.then(function(json_tunnels) {
  all_json_tunnels['RETHINK-EXPRESS-NGROK_URL'] = json_tunnels;
  return getTunnel(process.env['RETHINK-DB-NGROK_URL']);
})
.then(function(json_tunnels) {
  /**
   * NGROK TUNNELS
   */
  all_json_tunnels['RETHINK-DB-NGROK_URL'] = json_tunnels;
  console.log('\n>>---------\n all_json_tunnels:\n',
                               all_json_tunnels, '\n>>---------\n');

  /**
   * SAVE TO CONFIG FILE
   */
  return fsAsync.writeFile(CONFIG_JSON_FILE_PATH, JSON.stringify(all_json_tunnels, ' ', 2));
})
.then(function() {

  /**
   * START EXPRESS
   */
  app.listen(process.env.PORT || 8080, '0.0.0.0');
  console.log('listening on 0.0.0.0:' + process.env.PORT || 8080);
});
