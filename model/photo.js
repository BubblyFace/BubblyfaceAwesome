var mongoose = require("mongoose");
var photoSchema = require("../lib/schemas/photo");
//将模型注册到数据库中

var photo = mongoose.model('photo', photoSchema);



module.exports = photo;