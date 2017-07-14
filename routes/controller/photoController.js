var multer = require('multer');
var Ablum = new require('../../model/ablum');
var photo = new require('../../model/photo');
var fs = require('fs');
var path = require('path');

//存储配置
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './uploads/photos')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, fileFormat.length + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({
    storage: storage
}).array("image", 12);

//增加
var photoUpload = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return console.log(err);
        }
        //存到相应相册中
        var ablumId = req.query.id;
        res.send("success");
    })
}

module.exports = {
    photoUpload: photoUpload
}




