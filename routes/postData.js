const Ablum = new require('../model/ablum');
const fs = require('fs');
const path = require('path');
var multer  = require('multer')

//文件上传路径
var upload = multer({ dest: 'uploads/' })

const md = require('markdown-it')({
    html:true,
    linkify: false,
    typographer:true
});
const express = require('express');
const router = express.Router();


router.post('/imgUpload', upload.array('image',12),function (req, res, next) {
    console.log(req.body)
    console.log(req.body, req.files);
    res.send("res.body");
});

router.post('/articleUpload', function (req, res, next) {
    console.log(`hehe`)
});

module.exports = router;