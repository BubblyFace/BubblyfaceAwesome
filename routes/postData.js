const Ablum = new require('../model/ablum');
const fs = require('fs');
const path = require('path');
const photoController = require('./controller/photoController')
const articleController = require('./controller/articleController')
const ablumController = require('./controller/ablumController')


const md = require('markdown-it')({
    html:true,
    linkify: false,
    typographer:true
});
const express = require('express');
const router = express.Router();


router.post('/createAblum',ablumController.ablumCreate)
router.post('/photoUpload', photoController.photoUpload);
// router.post('/photoUpload', (rea,res)=>{
//     res.send("success")
// });

router.post('/articleUpload', articleController.dataInput);

module.exports = router;