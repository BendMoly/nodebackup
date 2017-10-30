const db = require('../db');

module.exports = function checkTags(tag){
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      connection.query('SELECT * FROM tags WHERE parent = ?', [tag], (err, result) => {
        if (result) {
          let resultJson = [];
          for (var i = 0; i < result.length; i++) {
            let o = {
              value: result[i].name,
              label: result[i].name
            }
            resultJson.push(o);
          }
          connection.release();
          resolve(resultJson);
        }
      })
    })
  })
}
