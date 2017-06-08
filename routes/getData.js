const Article = new require('../model/article');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
    html:true,
    linkify: false,
    typographer:true
});
const express = require('express');
const router = express.Router();


router.get('/', function (req, res, next) {
    Article.fetch(function (err, articles) {
        if (err) {
            console.log(err)
        }
        res.send({
            articles: articles
        })
    })
});

router.get('/getArticleDetail', function (req, res, next) {

    Article.findById(req.query.id, function (err, article) {
        if (err) {
            console.log(err)
        }
        let dirPath = '/Users/haoweisun/Desktop/work/BubblyFaceAwesome/src/public/md/'
        let articleContent = fs.readFileSync(path.join(dirPath,article.content), 'utf8',(err, data) => {
            if (err) throw err;
        });
        res.send({
            article: article,
            content: md.render(articleContent)
        })
    })
});

module.exports = router;