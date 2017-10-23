const db = require('../db');
const dateFormate = require('../utils/dateFormate');

/**
 * [getArticleList 获取文章列表]
 * @param  {string} column [栏目]
 * @param  {currentPage} tag [当前请求页码]
 * @return {promise}
 */
module.exports = function getArticleList(column, currentPage){
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      // 计算数据库中文章列表条数
      let select = '';
      if (!!column) {
        select = 'SELECT count(*) AS c FROM articleList WHERE `column` = ?';
      }else {
        select = 'SELECT count(*) AS c FROM articleList';
      }
      connection.query(select, [column], (err, result) => {
        if (result) {
          let count = result[0].c;

          let listSelect = ''
          if (!!column) {
            // 查询分页状态下的文章列表
            connection.query('SELECT * FROM articleList WHERE `column` = ? limit ?, ?', [column, (currentPage-1)*10, currentPage*10], (err, res) => {
              if (res) {
                // 格式化子栏目
                for(let i = 0; i < res.length; i++){
                  res[i].tag = res[i].tag.split(',');
                  res[i].time = dateFormate(res[i].time);
                }
                // 合并文章列表总条数及当前页码下的文章列表数据
                let getResult = {
                  data: res,
                  totalPage: count
                }
                // 释放连接
                connection.release();
                resolve(getResult);
              }
            })
          }else {
            // 查询分页状态下的文章列表
            connection.query('SELECT * FROM articleList limit ?, ?', [(currentPage-1)*10, currentPage*10], (err, res) => {
              if (res) {
                // 格式化子栏目
                for(let i = 0; i < res.length; i++){
                  res[i].tag = res[i].tag.split(',');
                  res[i].time = dateFormate(res[i].time);
                }
                // 合并文章列表总条数及当前页码下的文章列表数据
                let getResult = {
                  data: res,
                  totalPage: count
                }
                // 释放连接
                connection.release();
                resolve(getResult);
              }
            })
          }
        }
      })
    })
  })
}
