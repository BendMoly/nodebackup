const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');

// 导入session机制
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const cookieParser = require('cookie-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
 });

// 配置session参数

// 唯一标识符
var identityKey = 'molychn';
app.use(cookieParser('molychn'));
app.use(session({
 name: identityKey,
 secret: 'molychn', //用来对session id相关的cookie进行签名
 store: new FileStore(), //本地存储session，文本文件
 saveUninitialized: false, //是否自动保存未初始化的会话
 resave: false,
 cookie: {
   maxAge: 10 * 1000
 }
}))


 // 接口路由
 const api = require('../api/api.js');
 app.use('/api', api);
 // 后台接口
 const backup = require('../api/backup.js');
 app.use('/backup', backup);

const resolve = file => path.resolve(__dirname, file);
const serve = (path) => express.static(resolve(path));

const server = require('http').createServer(app);

app.use('/', serve('../public'));
server.listen(8090);
