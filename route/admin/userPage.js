//引入用户构造函数
const { User } = require('../../model/user');

module.exports = async(req, res) => {
    //存放当前页面的标识符
    req.app.locals.currentLink = 'user';

    //获得要访问的页码
    let page = req.query.page || 1;
    //查询数据库中的总条数
    let totalDoc = await User.countDocuments();
    //每页需要显示的条数
    let pageCount = 10;
    //计算总页数
    let totalPage = Math.ceil(totalDoc / pageCount);

    //计算需要跳过的条数
    let skipDoc = (page - 1) * pageCount;
    //查询所有的用户
    let users = await User.find({}).limit(pageCount).skip(skipDoc);


    res.render('admin/user', {
        users,
        page,
        total: totalPage
    })
}