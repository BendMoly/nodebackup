const db = require('../db');

module.exports = function updateTags(column, tags){
  return new Promise((resolve, reject) => {
    if (tags) {
      db.getConnection((err, connection) => {
        let query = 'INSERT INTO tags(name, parent) VALUES (?, ?)';
        // 逐一将tags标签插入tags表
        (function update(i){
          if (i >= tags.length) {
            // 释放连接
            connection.release();
            resolve(true);
            return;
          }
          connection.query(query, [tags[i], column], (err, res) => {
            if (res) {
              console.log(res);
              i++;
              update(i);
            }
          })
        })(0)
      })
    }else{
      console.log('没有新标签更新');
      reject(false);
    }

  })
}
