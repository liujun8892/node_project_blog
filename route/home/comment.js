//储存评论数据
const Comment = require('../../model/comment').Comment;

module.exports = async (req,res)=>{
    let {content,aid,uid} = req.body;
    await Comment.create({
        aid,
        uid,
        date:new Date(),
        content
    })
    res.redirect(`/home/article?id=${aid}`);
}
