//导入用户模块的用户集合构造函数
const User = require('../../model/user').User;

module.exports = async(req, res) => {
    const id = req.body.id;
    await User.findOneAndDelete({ _id: id });
    //重定向到用户
    res.redirect('/admin/user')
}