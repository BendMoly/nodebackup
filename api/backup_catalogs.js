const db = require('../db');

/**
 * 后台查询目录
 * @return {object} [返回一个promise对象]
 */
module.exports = function checkCatalogs(){
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      connection.query('SELECT * FROM catalogs', (err, result) => {
        if (result) {
          let resultJson = [];
          for(let i = 0; i < result.length; i++){
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
