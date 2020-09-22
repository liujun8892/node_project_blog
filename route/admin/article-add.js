//引入formidable处理提交的数据
const formidable = require('formidable');
//引入路径模块
const path  = require('path');
//引入文章模块
const {Article} = require('../../model/artical')

module.exports =  (req, res) => {
    //创建表单
    const form = new formidable.IncomingForm();
    //设置表单
    //设置存储路径
    form.uploadDir = path.join(__dirname,'../','../','public','upload');
    //默认去除表单数据后缀
    form.keepExtensions = true;
    //解析请求
    form.parse(req,async(err,fields,files)=>{
        //res.send(fields);
        let {title,author,publishDate,content} = fields;
        //处理cover路径
        cover = files.cover.path.split('public')[1];
        //插入文章数据
        await Article.create({
            title,
            author,
            publishDate,
            cover,
            content
        })
        //重定向到文章列表页
        res.redirect('/admin/article');
    })

}