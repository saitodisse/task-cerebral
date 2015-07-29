// Import express and co
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Load config for RethinkDB and express
var config = require(path.join(__dirname, '/config.js'));

// Import rethinkdbdash
var thinky = require('thinky')(config.rethinkdb);
var r = thinky.r;
var type = thinky.type;

// Create the model
var Task = thinky.createModel('tasks', {
  id: type.string(),
  title: type.string(),
  createdAt: type.date().default(r.now())
});

// Ensure that an index createdAt exists
Task.ensureIndex('createdAt');

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

app.route('/task/get').get(get);
app.route('/task/new').put(create);
app.route('/task/update').post(update);
app.route('/task/delete').post(del);

function handleError(res) {
  return function(error) {
    return res.send(500, {error: error.message});
  };
}

// Retrieve all tasks
function get(req, res, next) {
  Task.orderBy({index: 'createdAt'}).run().then(function(result) {

    setTimeout(function() {
      res.send(JSON.stringify(result));
    }, config.express.simulate_delay);

  }).error(handleError(res));
}

// Create a new task
function create(req, res, next) {
  var task = new Task(req.body);
  task.save().then(function(result) {

    setTimeout(function() {
      res.send(JSON.stringify(result));
    }, config.express.simulate_delay);

  }).error(handleError(res));
}

// Update a task
function update(req, res, next) {
  var task = new Task(req.body);
  Task.get(task.id).update({
   title: req.body.title
  }).run().then(function(task_response) {

    setTimeout(function() {
      res.send(JSON.stringify(task_response));
    }, config.express.simulate_delay);

  }).error(handleError(res));

  // Another way to delete a task is with
  // Task.get(req.body.id).update(task).execute()
}

// Delete a task
function del(req, res, next) {
  Task.get(req.body.id).run().then(function(task) {
    task.delete().then(function(result) {

      setTimeout(function() {
        res.send(req.body.id + ' was deleted');
      }, config.express.simulate_delay);

    }).error(handleError(res));
  }).error(handleError(res));

  // Another way to delete a task is with
  // Task.get(req.body.id).delete().execute()
}

// Start express
app.listen(config.express.port, '0.0.0.0');
console.log('listening on 0.0.0.0:' + config.express.port);
