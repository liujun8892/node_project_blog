//创建服务器
const express = require('express');
const app = express();
//引入body-parser
const bodyParser = require('body-parser');

//处理session
const session = require('express-session');
app.use(session({
    secret: 'secret key',
    'resave': false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));
//处理post提交数据
app.use(bodyParser.urlencoded({extended: false}))

//引入路由
const home = require('./route/home');
const admin = require('./route/admin');

//开放静态资源
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//引入数据库相关模块
//判断当前运行环境
//1.对开发环境客户端的请求打印
const morgan = require('morgan');
// if (process.env.NODE_ENV==='development'){
//     console.log('当前是开发环境')
//     app.use(morgan('dev'));
// }else {
//     console.log('当前是生产环境')
// }
//2.使用不同的配置
const config = require('config');
config.get('title')
console.log(config.get('title'))

require('./model/connect');

//设置模板引擎
//1.目录
app.set('views', path.join(__dirname, 'views'));
//2.默认后缀
app.set('view engine', 'art');
//3.引擎
app.engine('art', require('express-art-template'));
//4.引入模板,传入日期处理方法
const template = require('art-template');
const dateFormat = require('dateformat');
template.defaults.imports.dateFormat =dateFormat;

//路由之前对用户的登录状态进行判断
app.use('/admin', require('./middleware/loginGuard'));

//绑定一级路由
app.use('/', home);
app.use('/home', home);
app.use('/admin', admin);

//错误处理
// app.use((err, req, res, next) => {
//     const result = JSON.parse(err);
//     let resArr = [];
//     for (let key in result) {
//         if (key != 'path') {
//             resArr.push(key + '=' + result[key]);
//         }
//     }
//     res.redirect(`${result.path}?${resArr.join('&')}`)
// })

//监听80端口
app.listen(80);
console.log('服务器启动成功')