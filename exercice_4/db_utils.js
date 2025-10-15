
const { Client } = require('pg');

function getConnection(user, password, database) {
  return new Client({
    host: 'localhost',
    user,
    password,
    database,
    port: 5432,
  });
}

function getUsers(callback) {
  const client = getConnection(process.env.dbuser, process.env.dbpwd, process.env.dbname || 'mabase');
  client.connect()
    .then(() => client.query('SELECT * FROM users'))
    .then(res => {
      callback(null, res.rows);
      return client.end();
    })
    .catch(err => {
      callback(err);
      client.end();
    });
}

function insert_user(user, callback) {
  const client = getConnection(process.env.dbuser, process.env.dbpwd, process.env.dbname || 'mabase');
  client.connect()
    .then(() => client.query('INSERT INTO users(email) VALUES($1) RETURNING *', [user.email]))
    .then(res => {
      callback(null, res.rows[0]);
      return client.end();
    })
    .catch(err => {
      callback(err);
      client.end();
    });
}

module.exports = { getConnection, getUsers, insert_user };
