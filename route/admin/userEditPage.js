const { User } = require('../../model/user');

module.exports = async(req, res) => {
    //1.判断是添加用户还是修改用户,修改用户会有id
    const { msg, id } = req.query;
    if (id) {
        //修改用户
        //查询用户
        let user = await User.findOne({ _id: id });
        //回显用户信息
        res.render('admin/user-edit', {
            msg,
            user,
            button: '修改',
            link: `/admin/user-modify?id=${id}`
        });

    } else {
        //添加用户
        res.render('admin/user-edit', {
            msg,
            button: '添加',
            link: '/admin/user-edit'
        });
    }

}