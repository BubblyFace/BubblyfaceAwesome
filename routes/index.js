const Article = require('../model/article')
var express = require('express');
var getData = require('./getData')
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
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
}