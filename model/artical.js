//定义文章集合的构造函数
const mongose = require('mongoose');

const articleSchema = new mongose.Schema({
    title: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, '请输入文章标题']
    },
    author: {
        type: mongose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
})

const Article = mongose.model('Article', articleSchema);

module.exports = {
    Article
}
