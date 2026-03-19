const connection = require('./data.js');

// Example query
connection.query('SELECT * FROM users', (err, results) => {
  if (err) throw err;
  console.log(results);
});