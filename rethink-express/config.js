//FIXME: remove hardcoded values
module.exports = {
  rethinkdb: {
      host: 'rethinkdb.dev.azk.io',
      port: process.env.RRRR || 28015,
      authKey: '',
      db: 'tasks_cerebral'
  },
  express: {
      port: process.env.PORT || 8080
  },
  rethinkdb_server_ngrok: {
    api: 'http://rethink-express-ngrok.dev.azk.io/api'
  },
};
