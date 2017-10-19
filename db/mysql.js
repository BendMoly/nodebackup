const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lincy1314$',
  database: 'myBlog'
});

connection.connect();

connection.query('SELECT * from articleList', function(err, rows, fields){
  if (err) {
    console.log(err);
    return;
  }

  console.log(rows);
})

connection.end();
