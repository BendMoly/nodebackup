const express = require('express');
const api = express.Router();

// 文章列表数据库查询
const articleList = require('./backup_articleList');
// 文章列表时间段查询
const timeSearch = require('./backup_articleTimeSearch');
// 后台目录查询
const checkCatalogs = require('./backup_catalogs');
// 后台栏目查询
const checkColumns = require('./backup_columns');
// 后台标签查询
const checkTags = require('./backup_tags');
// 新标签存储插入
const updateTags = require('./backup_updateTag');
// 文章发布数据插入
const release = require('./backup_release');

// 仅限后端接口需要做session权限控制
// api.use('/', (req, res, next) => {
//   // 实现用户每次请求接口时重新更新loginUser的过期时间
//   req.session._garbage = Date();
//   req.session.touch();
//
//   // 判断session是否过期
//   if (req.session.loginUser) {
//     next();
//   }else{
//     res.status(403);
//     res.json({
//       code: '40001',
//       msg: '您暂未登录，请前往登录'
//     })
//   }
// })

api.post('/articleList', (req, res) => {
  console.log('请求后台文章列表接口');
  articleList(req.body.select, req.body.text, req.body.currentPage).then(val => {
    let result = {
      code: '40001',
      msg: '请求成功',
      data: val.data,
      currentPage: Number(req.body.currentPage),
      totalPage: val.totalPage
    }
    res.status(200);
    res.json(result);
  })
})

api.post('/articleListTimeSearch', (req, res) => {
  console.log('请求时间段检索');
  timeSearch(req.body.pastTime, req.body.newTime, req.body.currentPage).then(val => {
    let result = {
      code: '40001',
      msg: '请求成功',
      data: val.data,
      currentPage: Number(req.body.currentPage),
      totalPage: val.totalPage
    }
    res.status(200);
    res.json(result);
  })
})

api.post('/checkCatalogs', (req, res) => {
  console.log('请求到后台目录');
  checkCatalogs().then(val => {
    res.status(200);
    res.json(val);
  })
})

api.post('/checkColumns', (req, res) => {
  checkColumns(req.body.column).then(val => {
    let result = {
      code: '40001',
      msg: '请求成功',
      data: val
    }
    res.status(200);
    res.json(result);
  })
})

api.post('/checkTags', (req, res) => {
  checkTags(req.body.tag).then(val => {
    let result = {
      code: '40001',
      msg: '请求成功',
      data: val
    }
    res.status(200);
    res.json(result);
  })
})

api.post('/updateTags', (req, res) => {
  console.log(req.body.column, req.body.tags);
  updateTags(req.body.column, req.body.tags).then(val => {
    if (val) {
      let result = {
        code: '40001',
        msg: '请求成功'
      };
      res.status(200);
      res.json(result);
    }
  },
  err => {
    let result = {
      code: '40001',
      msg: '请求成功,无新标签更新'
    };
    res.status(200);
    res.json(result);
  })
})

api.post('/release', (req, res) => {
  let reqJson = {
    title: req.body.title,
    column: req.body.column,
    summary: req.body.summary,
    content: req.body.content,
    tags: req.body.tags
  }
  console.log(reqJson);
  release(reqJson).then(val => {
    if (val) {
      let result = {
        code: '40001',
        msg: '请求成功'
      }
      res.status(200);
      res.json(result);
    }
  })
})

module.exports = api;
