const Ablum = new require('../model/ablum');
const fs = require('fs');
const path = require('path');
const photoController = require('./controller/ablumController')
const articleController = require('./controller/articleController')


const md = require('markdown-it')({
    html:true,
    linkify: false,
    typographer:true
});
const express = require('express');
const router = express.Router();


router.post('/imgUpload', photoController.dataInput);

router.post('/articleUpload', articleController.dataInput);

module.exports = router;