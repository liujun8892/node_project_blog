//导入用户模块的验证方法
const validData = require('../../model/user').validData;
//导入用户模块的用户集合构造函数
const User = require('../../model/user').User;
//导入加密模块
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    //存放当前页面的标识符
    req.app.locals.currentLink = 'user';

    //1.验证用户数据`
    try {
        await validData(req.body);
    } catch (e) {
        //重定向到添加用户页面
        return next(JSON.stringify({ path: '/admin/user-edit', msg: e.message }));
    }
    //2.存储用户数据
    let user = await User.findOne({ email: req.body.email });
    if (user != null) {
        //重定向到添加用户页面
        return next(JSON.stringify({ path: '/admin/user-edit', msg: '该邮箱已经注册,请重新输入' }));
    }
    //加密用户密码
    const genSalt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash(req.body.password, genSalt);
    req.body.password = pass;
    User.create(req.body);
    //重定向到用户列表页面
    return res.redirect(`/admin/user`);
}