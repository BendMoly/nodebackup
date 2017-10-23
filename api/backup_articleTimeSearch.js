const db = require('../db');
const dateFormate = require('../utils/dateFormate');

module.exports = function timeSearch(pastTime, newTime, currentPage){
  console.log(pastTime, newTime, currentPage);
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      connection.query('SELECT count(*) AS c FROM articleList WHERE time BETWEEN ? AND ?', [pastTime, newTime], (err, res) => {
        if (res) {
          let count = res[0].c;
          let query = 'SELECT * FROM articleList WHERE time BETWEEN ? AND ? limit ?, ?';
          connection.query(query, [pastTime, newTime, (currentPage-1)*10, currentPage*10], (err, result) => {
            if (result) {
              // 格式化子栏目
              for(let i = 0; i < result.length; i++){
                result[i].tag = result[i].tag.split(',');
                result[i].time = dateFormate(result[i].time);
              }
              console.log(result[0].time);
              // 合并文章列表总条数及当前页码下的文章列表数据
              let getResult = {
                data: result,
                totalPage: count
              }
              // 释放连接
              connection.release();
              resolve(getResult);
            }
          })
        }
      })
    })
  })
}
