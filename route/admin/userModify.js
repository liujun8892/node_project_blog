const User = require('../../model/user').User;
const bcrypt = require('bcrypt');

module.exports = async(req, res, next) => {
    //验证密码
    const id = req.query.id;
    const { username, password, email, role, state } = req.body;
    const user = await User.findOne({ _id: id });
    let valid = await bcrypt.compare(password, user.password);
    if (valid) {
        //执行修改操作
        await User.updateOne({ _id: id }, {
                username: username,
                email: email,
                role: role,
                state: state
            })
            //重定向到列表页面
        res.redirect('/admin/user')
    } else {
        //重定向到修改页面
        return next(JSON.stringify({ path: '/admin/user-edit', msg: '输入密码不正确,修改失败', id: id }));
    }
}