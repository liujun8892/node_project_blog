module.exports = (req, res) => {
    //1.清除服务端session
    req.session.destroy(() => {
        //2.清除客户端cookie
        res.clearCookie('connect.sid');
        //3.清除服务端userInfo
        req.app.locals.userInfo = null;
        //2.重定向到登录页面
        res.redirect('/admin/login');
    })
}