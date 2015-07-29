// Import express and co
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('superagent');
var fsAsync = require('file-async');

var app = express();

// get ngrok tunnel by local API
request
     //FIXME: remove hardcoded values
.get('http://rethink-express-ngrok.dev.azk.io/api/tunnels')
.set('Accept', 'application/json')
.end(function(err, res){
  if(err) {
    throw err;
  }

  var json_response = JSON.parse(res.text);
  var http_rethinkdb_server_ngrok;
  if (json_response.tunnels[0].proto === 'http') {
    http_rethinkdb_server_ngrok = json_response.tunnels[0].public_url;
  } else {
    http_rethinkdb_server_ngrok = json_response.tunnels[1].public_url;
  }

  /**/console.log('\n>>---------\n http_rethinkdb_server_ngrok:\n', http_rethinkdb_server_ngrok, '\n>>---------\n');/*-debug-*/

  var CONFIG_JSON_FILE_PATH = '../src/config.json';
  // touch
  fsAsync.writeFile(CONFIG_JSON_FILE_PATH, JSON.stringify(json_response.tunnels))
  .then(function() {
    // get stat
    return fsAsync.stat(CONFIG_JSON_FILE_PATH);
  })
  .then(function(file_stat) {
    // check
    console.log(CONFIG_JSON_FILE_PATH, 'is a file?', file_stat.isFile());

    // Start express
    app.listen(process.env.PORT || 8080, '0.0.0.0');
    console.log('listening on 0.0.0.0:' + process.env.PORT || 8080);
  });
});

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

