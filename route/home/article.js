//导入Article构造函数
const Article = require('../../model/artical').Article;
//评论数据
const Comment = require('../../model/comment').Comment;

module.exports = async (req, res) => {
    let article = await Article.findOne({_id:req.query.id}).populate('author');
    //查询文章评论
    let comments = await Comment.find({aid:req.query.id}).populate('uid');
   res.render('home/article',{article,comments})
}