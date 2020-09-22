//评论集合
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    aid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date:{
        type:Date
    },
    content:{
        type:String
    }
})

const Comment = mongoose.model('Comment',commentSchema);

module.exports = {
    Comment
}