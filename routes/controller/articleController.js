var multer = require('multer');
const Article = new require('../../model/article');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
    html:true,
    linkify: false,
    typographer:true
});


//存储配置
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './uploads/mds')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, fileFormat[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//文件上传路径

var upload = multer({
    storage: storage
}).single("article");
//multer有single()中的名称必须是表单上传字段的name名称。

function dataInput(req, res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return console.log(err);
        };
        //存储信息
        var articleData = req.body
        articleData['path'] = req.file.path;
        var article = new Article(articleData);
        article.save(function(err,art){
            console.log("success saved"+art)
        })
        console.log(articleData)
        console.log(req.body);
        console.log(req.file);
        res.json({
            meg:"success"
        })
    });
}

function getArticleDetail(req,res,next){
    Article.find({_id:req.query.id}, function (err, article) {
        if (err) {
            console.log(err)
        }
        let dirPath = '/Users/haoweisun/Desktop/work/BubblyFaceAwesome/';
        console.log(article);
        let articleContent = fs.readFileSync(path.join(dirPath,article[0].path), 'utf8',(err, data) => {
            if (err) throw err;
        });
        res.send({
            article: article,
            content: md.render(articleContent)
        })
    })
}

function getAllArticles(req,res,next){
     Article.fetch(function (err, articles) {
        if (err) {
            console.log(err)
        }
        res.send({
            articles: articles
        })
    })
}

function removeArticle(req,res,next){
    var del = {'_id':ObjectId('req._id')}
    Article.remove(del,(err)=>{
        if(err){
            console.log(err)
        }else{
            res.json({
                msg:"success"
            })
        }
    })
}

module.exports ={
    dataInput:dataInput,
    getAllArticles:getAllArticles,
    getArticleDetail:getArticleDetail,
    removeArticle:removeArticle
}