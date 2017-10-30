const db = require('../db');
const dateFormate = require('../utils/dateFormate');

/**
 * 发布接口
 * @param  {object} obj [发布参数对象]
 * @return {object}     [返回一个promise对象]
 */
module.exports = function release(obj){
  console.log(obj);
  return new Promise((resolve, reject) => {
    // 后台自动生成一个文章发布时间
    var date = new Date();
    var time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    // 后台自动生成文章uuid标识码
    var uuid = date.valueOf();

    // var title = obj.title, summary = obj.summary, column
    db.getConnection((err, connection) => {
      let query = 'INSERT INTO articleList(uuid, title, time, summary, `column`, tag, content) VALUES (?, ?, ?, ?, ?, ?, ?)';
      connection.query(query, [uuid, obj.title, time, obj.summary, obj.column, obj.tags, obj.content], (err, res) => {
        if (res) {
          console.log(res);
          resolve(true);
        }
      })
    })
  })
}
