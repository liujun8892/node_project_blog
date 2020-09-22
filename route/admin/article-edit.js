module.exports = (req, res) => {
    //存放当前页面的标识符
    req.app.locals.currentLink = 'article';

    res.render('admin/article-edit')
}