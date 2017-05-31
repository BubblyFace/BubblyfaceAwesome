const Article = new require('../model/article');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')();
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
        console.log(__dirname);
        let dirPath = '/Users/haoweisun/Desktop/work/BubblyFaceAwesome/src/public/md/'
        let articleContent = fs.readFileSync(path.join(dirPath,'test.md'), 'utf8',(err, data) => {
            if (err) throw err;
            console.log(data);
        });
        console.log(md.render(articleContent));

        res.send({
            article: article,
            content: md.render(articleContent)
        })
    })
});


// function article(cb) {
//     Article.fetch(function(err,articles){
//         if(err){
//             console.log(err)
//         }
//         cb(articles);
//     })
// }
// module.exports = {
//     article : article
// }

module.exports = router;