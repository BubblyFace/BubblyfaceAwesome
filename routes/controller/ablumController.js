var multer = require('multer');
const Ablum = new require('../../model/ablum');
const fs = require('fs');
const path = require('path');


var ablumCreate = function (req, res) {
    console.log(req.body.data);
    var params = req.params;
    var ablumData = {
        title: params.title,
        author: params.author,
        describe: params.describe
    };
    var ablum = new Ablum(ablumData);
    ablum.save(function(err,abl){
            console.log("success saved"+abl._id)
            res.json({"id":abl._id})
        })
}

var getAllAblum = function(req,res){
    console.log(req.body.data);
}

var getAblumDetail = function(req,res){
    console.log(req.body.data);

}
//



module.exports = {
    ablumCreate: ablumCreate,
    getAllAblum: getAllAblum,
    getAblumDetail:getAblumDetail
}