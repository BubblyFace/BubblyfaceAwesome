//get请求的处理
const Article = new require('../model/article');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
    html: true,
    linkify: false,
    typographer: true
});
const express = require('express');
var articleController = require('./controller/articleController');
var ablumController = require('./controller/ablumController')
const router = express.Router();

//文章数据处理
router.get('/', articleController.getAllArticles);
router.get('/getArticleDetail', articleController.getArticleDetail);
router.get('/removeArticle', articleController.removeArticle);

//图片数据处理
//相册创建
//router.get('/createAblum',ablumController.createAblum)
router.get('/getAllPhoho', ablumController.getAllAblum);
router.get('/getAblumDetail', ablumController.getAblumDetail);
// router.get('/removeAblum', ablumController.removeAblum);

module.exports = router;