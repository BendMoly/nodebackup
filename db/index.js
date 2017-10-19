// 导入mysql模块
const mysql = require('mysql');

// 导入数据库预配置
const DBconfig = require('./DBconfig.js');

// 创建数据库连接池
const pool = mysql.createPool(DBconfig.mysql);

module.exports = pool;
