//连接数据库
const mongoose = require('mongoose');
//引入配置模块
const config = require('config')

mongoose.connect(`mongodb://${config.get('mongoDB.user')}:${config.get('mongoDB.pwd')}@${config.get('mongoDB.host')}/${config.get('mongoDB.name')}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));