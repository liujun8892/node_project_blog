//1.定义用户集合的构造函数
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    }
})
const User = mongoose.model('User', userSchema);

// async function createUser() {
//     const genSalt = await bcrypt.genSalt(10);
//     const pass = await bcrypt.hash('123456', genSalt);
//     let user = await User.create({
//         username: 'administrator',
//         email: 'ajun_8892@163.com',
//         password: pass,
//         //普通用户为normal 管理员为admin
//         role: 'admin',
//         //0位启用 1为未启用
//         state: 0
//     })
// }
//创建测试数据

//2.用户注册数据的验证
//导入joi验证
const Joi = require('joi');
const validData = (user => {
    const userSchema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱不符合规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码不符合规则')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('密码不符合规则')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态不符合规则'))
    }

    return Joi.validate(user, userSchema);
})

//导出User
module.exports = {
    User,
    validData
}