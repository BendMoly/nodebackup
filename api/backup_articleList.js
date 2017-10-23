const db = require('../db');
const dateFormate = require('../utils/dateFormate');

module.exports = function getArticleList(select, text, currentPage){
  console.log(select, text, currentPage);
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      let query = '';
      // 判断是否存在模糊搜索参数
      if (select) {
        switch (select) {
          case 'column':
            console.log('选择的是column');
            query = 'SELECT * FROM articleList WHERE `column` = ? limit ?, ?';
            connection.query('SELECT count(*) AS c FROM articleList WHERE `column` = ?', [text], (err, res) => {
              if (res) {
                let count = res[0].c;
                connection.query(query, [text, (currentPage-1)*10, currentPage*10], (err, result) => {
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
            break;
          case 'title':
            query = 'SELECT * FROM articleList WHERE title like "%'+text+'%" limit ?, ?';
            connection.query('SELECT count(*) AS c FROM articleList WHERE title like "%'+text+'%"', (err, res) => {
              if (res) {
                console.log(res);
                let count = res[0].c;
                connection.query(query, [(currentPage-1)*10, currentPage*10], (err, result) => {
                  if (result) {
                    // 格式化子栏目
                    for(let i = 0; i < result.length; i++){
                      result[i].tag = result[i].tag.split(',');
                      result[i].time = dateFormate(result[i].time);
                    }
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
            break;
        }
      }else {
        query = 'SELECT * FROM articleList limit ?, ?';
        connection.query('SELECT count(*) AS c FROM articleList', (err, res) => {
          if (res) {
            let count = res[0].c;
            connection.query(query, [(currentPage-1)*10, currentPage*10], (err, result) => {
              if (result) {
                // 格式化子栏目
                for(let i = 0; i < result.length; i++){
                  result[i].tag = result[i].tag.split(',');
                  result[i].time = dateFormate(result[i].time);
                }
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
      }
    })
  })
}
