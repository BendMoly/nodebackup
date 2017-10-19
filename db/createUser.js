const crypto = require('crypto');
const md5 = crypto.createHash('md5');

const mysql = require('mysql');
const DBconfig = require('./DBconfig');

// const InitUser = (name, password, auth) => {
//   return new Promise((resolve, reject) => {
//     let md5Password = md5.update(password).digest('hex');
//     let result = [name, md5Password, auth];
//     resolve(result);
//   })
// }
// console.log(InitUser('molychn', 'lincy1314:)P$250', 'admin'));

// 创建数据库连接池
const pool = mysql.createPool(DBconfig.mysql);

pool.getConnection((err, connection) => {
  // 人为操作存入一条用户记录
  const query = 'INSERT INTO user (name, password, auth) VALUES (?, ?, ?)';

  connection.query(query, ['molychn', md5.update('lincy1314:)P$250').digest('hex'), 'admin'], (err, result) => {
    if (result) {
      console.log('insert success!!!');
    }
  })

  connection.release();
})
