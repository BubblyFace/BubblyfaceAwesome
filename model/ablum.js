var mongoose = require("mongoose");
var AblumSchema = require("../lib/schemas/ablum");
//将模型注册到数据库中

var Ablum = mongoose.model('Ablum', AblumSchema);



module.exports = Ablum;