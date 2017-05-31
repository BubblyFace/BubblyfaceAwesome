var mongoose = require("mongoose");
var ArticleSchema = require("../lib/schemas/article");
//将模型注册到数据库中

var Article = mongoose.model('Article', ArticleSchema);



module.exports = Article;