const Article = require('../model/article')
var express = require('express');
var getData = require('./getData')
var bodyParser = require('body-parser');
//var multer = require('multer');

module.exports = function (app) {
    //接收外部的index传来的express对象
    app.get('/', function (req, res) {
        res.redirect('index/index');
    });
    // app.get('/getData', function(req, res) {
    //     getData.article(function(articles){
    //         //这是回调
    //         res.send({
    //             articles:articles
    //         })
    //     })
    // });
    app.use('/getData', require('./getData'))
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({
        extended: true
    })); // for parsing application/x-www-form-urlencoded
    //app.use(multer()); // for parsing multipart/form-data
    app.use('/postData', require('./postData'))
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
}