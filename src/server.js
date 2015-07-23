var r = require('rethinkdb');
r.connect({ host: 'http://rethinkdb.dev.azk.io', port: 28015 }, function(err, conn) {
  if(err) {
    throw err;
  }

  r.db('test').tableCreate('tasks').run(conn, function(err1, res1) {
    if(err1) {
      console.error(err1);
    }
    console.log(res1);
    r.table('tasks').insert({ name: 'My new task' }).run(conn, function(err2, res2)
    {
      if(err2) {
        console.error(err2);
      }
      console.log(res2);
    });
  });
});
