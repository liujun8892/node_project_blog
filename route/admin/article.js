//导入文章模块
const {Article} = require('../../model/artical');
//导入分页
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    let page = req.query.page||1;
    //存放当前页面的标识符
    req.app.locals.currentLink = 'article';
    //读取所有的文章
    let articles= await pagination(Article).find().page(page).size(3).display(3).populate('author').exec();
    // res.send(articles)
    res.render('admin/article',{articles})
}