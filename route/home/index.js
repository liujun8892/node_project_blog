//导入Article构造函数
const Article = require('../../model/artical').Article;
//导入分页插件
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    let page = req.query.page || 1;
    //分页查询数据
    let articles = await pagination(Article).find().page(page).size(6).display(5).populate('author').exec();
  // res.send(articles);
     res.render('home/default',{
         articles
     })
}