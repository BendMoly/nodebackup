const db = require('../db');

module.exports = function updateCatalog(){
  return new Promise((resolve, reject) => {
    let catalogsResult = [];
    db.getConnection((err, connection) => {
      // 查询总目录分类
      connection.query('SELECT * FROM catalogs', (err, res) => {
        if (res) {
          (function catalogsFormate(i){
            if (!!!res[i]) {
              connection.release();
              resolve(catalogsResult);
            }
            let o = {}
            // 将目录名存放在对象o中
            o.name = res[i].name;
            subCatalogs(o).then(val => {
              if (i < res.length) {
                console.log('这是val');
                console.log(val);
                catalogsResult.push(val);
                console.log(catalogsResult);
                i += 1;
                catalogsFormate(i);
              }
            })
          })(0)
        }
      })
    })
  })
}

function subCatalogs(o){
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      // 查询各目录下的栏目
      connection.query('SELECT * FROM subCatalogs WHERE parent = ?', [o.name], (err, result) => {
        let items = [];
        if (result) {
          for(let j = 0; j < result.length; j++){
            let obj = {
              name: result[j].name,
              index: 'home/' + result[j].name
            }
            items.push(obj);
          }
          // 将所属目录查询到的栏目存放到相同的对象o中
          o.items = items;
          connection.release();
          resolve(o);
        }
      })
    })
  })
}
