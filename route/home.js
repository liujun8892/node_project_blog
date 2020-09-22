//创建主页路由
const express = require('express')
const home = express.Router();
//绑定二级路由

//首页页面渲染
home.get('/',require('./home/index'));

//文章页面渲染
home.get('/article',require('./home/article'));

//文章评论
home.post('/comment',require('./home/comment'))

//导出主页路由
module.exports = home;