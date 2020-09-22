//创建管理路由
const express = require('express')
const admin = express.Router();
//导入body解析
const bodyParser = require('body-parser');
admin.use(bodyParser.urlencoded({ extended: false }));

//用户登录页面渲染
admin.get('/login', require('./admin/loginPage'));

//实现用户登录
admin.post('/login', require('./admin/login'));

//实现用户退出
admin.get('/logout', require('./admin/logout'));

//用户中心页面渲染
admin.get('/user', require('./admin/userPage'));

//添加用户页面渲染  
admin.get('/user-edit', require('./admin/userEditPage'));

//实现新增用户
admin.post('/user-edit', require('./admin/userEdit'));

//实现修改用户
admin.post('/user-modify', require('./admin/userModify'));

//实现删除用户
admin.post('/user-delete', require('./admin/userDelete'));

//文章列表页面渲染
admin.get('/article', require('./admin/article'));

//文章编辑页面渲染
admin.get('/article-edit', require('./admin/article-edit'));

//文章页面添加
admin.post('/article-add',require('./admin/article-add'));

//导出管理路由
module.exports = admin;