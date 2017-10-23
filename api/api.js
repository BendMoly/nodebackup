const express = require('express');
const api = express.Router();

// 文章列表数据库查询
const articleList = require('./articleList');
// 登录数据库查询
const checkUser = require('./user');


// 引入article文章数据
const article = require('./article.js');
// 引入评论接口
const review = require('./review.js');

// 文章列表接口
api.post('/articleList', function(req, res){
    articleList(req.body.column, req.body.currentPage).then(val => {
      let result = {
        code: 200,
        msg: '请求成功',
        data: val.data,
        currentPage: Number(req.body.currentPage),
        totalPage: val.totalPage
      }
      res.status(200);
      res.json(result);
    })
});

// 文章详情接口
api.post('/article', (req, res) => {
  console.log(req.body);
  console.log('请求文章详情');
  res.status(200);
  res.json(article);
});

// 文章评论接口
api.post('/review', (req, res) => {
  console.log('请求文章评论列表');
  res.status(200);
  res.json(review);
})

// 后台登录接口
api.post('/login', (req, res) => {
  console.log('请求登录');
  console.log(req.body.name, req.body.password);
  checkUser(req.body.name, req.body.password).then(val => {
    if (val) {
      req.session.loginUser = val;
      res.status(200);
      res.json({code:40001, msg: '登录成功'});
    }else {
      res.status(403);
      res.json({code:40002, msg: '用户或密码错误'});
    }
  },
  err => {
    console.log(err);
  })
})

module.exports = api;
