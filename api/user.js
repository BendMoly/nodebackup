const db = require('../db');

const crypto = require('crypto');

/**
 * [checkUser 检测登录用户是否存在]
 * @param  {string} name     [用户名]
 * @param  {string} password [密码]
 * @return {promise}         [promise对象]
 */
module.exports = function checkUser(user, password){
  console.log(user, password);
  let mdPassword = crypto.createHash('md5').update(password).digest('hex');
  console.log(user, mdPassword);
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      const query = 'SELECT * FROM userList WHERE name = ? AND password = ?';
      connection.query(query, [user, mdPassword], (err, result) => {
        if (result) {
          console.log(result);
          resolve(result[0].name);
        }
      })

      connection.release();
    })
  })
}
