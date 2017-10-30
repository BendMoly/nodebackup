const db = require('../db');

module.exports = function checkColumns(column){
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      connection.query('SELECT * FROM subCatalogs WHERE parent = ?', [column], (err, result) => {
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
