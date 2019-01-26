const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'noorida',
  },
  debug: true,
  pool: {
    max: 10,
  },
  acquireConnectionTimeout: 6000,
});

module.exports = knex;
