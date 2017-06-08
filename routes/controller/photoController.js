var multer = require('multer')

//存储配置
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, './uploads/photos')
    },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
});
//文件上传路径

var upload = multer({
    storage: storage
}).array("image",12);
//multer有single()中的名称必须是表单上传字段的name名称。
exports.dataInput = function (req, res) {
    upload(req, res, function (err) {
        //添加错误处理
        if (err) {
            return console.log(err);
        }
        //文件信息在req.file或者req.files中显示。
        console.log(req.files);
        res.send("success")
    });
}