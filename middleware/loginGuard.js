module.exports = (req, res, next) => {
    //当用户访问后台管理页面时,访问的既不是登录页面,也没有登录,就重定向后台的登录页面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        //先走的下面这一步,才会跳转登录的页面
        //如果是普通用户就跳转文章首页,其他的请求放行
        if (req.session.role==='normal'){
         return   res.redirect('/home');
        }
        next();
    }
}
