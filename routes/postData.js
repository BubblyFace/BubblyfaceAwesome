const Ablum = new require('../model/ablum');
const fs = require('fs');
const path = require('path');
const photoController = require('./controller/photoController')
// var multer  = require('multer')

// //存储配置
// var storage = multer.diskStorage({
//      //设置上传后文件路径，uploads文件夹会自动创建。
//         destination: function (req, file, cb) {
//             cb(null, './public/uploads')
//        }, 
//      //给上传文件重命名，获取添加后缀名
//       filename: function (req, file, cb) {
//           var fileFormat = (file.originalname).split(".");
//           cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
//       }
//  });  
// //文件上传路径
// var upload = multer({ storage: storage })

const md = require('markdown-it')({
    html:true,
    linkify: false,
    typographer:true
});
const express = require('express');
const router = express.Router();


router.post('/imgUpload', photoController.dataInput);

router.post('/articleUpload', function (req, res, next) {
    console.log(`hehe`)
});

module.exports = router;