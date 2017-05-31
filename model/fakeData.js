var mongoose = require
var Article = require('./article');
console.log(Article)
var fakeArticle = [
    {
        title: "test",
        id: "test",
        author: "shw",
        extract: "前言   首页的高速加载和渲染一直是前端开发者们津津乐道的事情，因此各种技术也应运而生。在 HTTP1.1 时代，为了减少请求的发送，加快首页加载，压缩和合并成了必不可少的技术，其中包括了 JavaScript 文件的压缩、混淆和合并，还有 CSS 文件的压缩和合并，最后还有一个是针对小图片的请求优化，也就是 CSS Sprite，也叫 雪碧图 或",
        content:"test",
        meta:{
            createAt : Date.now()
        }

    },
    {
        title: "test",
        id: "test",
        author: "shw",
        extract: "前言   首页的高速加载和渲染一直是前端开发者们津津乐道的事情，因此各种技术也应运而生。在 HTTP1.1 时代，为了减少请求的发送，加快首页加载，压缩和合并成了必不可少的技术，其中包括了 JavaScript 文件的压缩、混淆和合并，还有 CSS 文件的压缩和合并，最后还有一个是针对小图片的请求优化，也就是 CSS Sprite，也叫 雪碧图 或",
        content:"test",
        meta:{
            createAt : Date.now()
        }
    }
]

// for(article of fakeArticle){
//     var ArtD = new Article(article);
//     ArtD.save(function (err,art) {
//         if(err){
//             console.log(err)
//         }
//         console.log(art)
//     })
// }

