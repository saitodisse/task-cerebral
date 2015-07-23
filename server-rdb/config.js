module.exports = {
    rethinkdb: {
        host: 'rethinkdb.dev.azk.io',
        port: process.env.RRRR || 28015,
        authKey: '',
        db: 'tasks_cerebral'
    },
    express: {
        port: process.env.PORT || 8080
    }
};
