//导入用户模块
const { User } = require('../../model/user');
//导入加密模块
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    //服务端验证如果输入的邮箱或密码为空,跳转错误页面
    if (req.body.email.trim().length === 0 || req.body.password.trim().length === 0) {
        return res.status(400).render('admin/error', { msg: '您输入的邮箱或密码错误,3秒后为您跳转到登录页' })
    }
    let email = req.body.email;
    //查询数据库,比对用户输入的密码
    let user = await User.findOne({ email });
    if (user) {
        //req.body.password === user.password
        let isValid = await bcrypt.compare(req.body.password, user.password);
        if (isValid) {
            req.session.username = user.username;
            //把用户的角色存入cookie中
            req.session.role = user.role;
            //储存到locals中实现单点登录
            req.app.locals.userInfo = user;
            //判断用户角色,如果是管理员则进入后台管理系统,如果是普通用户进入文章首页
            if (user.role==='admin'){
                //重定向到管理用户页面
                res.redirect('/admin/user');
            }else {
                //重定向到文章首页
                res.redirect('/home');
            }

        } else {
            return res.status(400).render('admin/error', { msg: '您输入的邮箱或密码错误,3秒后为您跳转到登录页' })
        }
    } else {
        return res.status(400).render('admin/error', { msg: '您输入的邮箱或密码错误,3秒后为您跳转到登录页' })
    }
}