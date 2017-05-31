var mongoose = require("mongoose");

var ArticleSchema = mongoose.Schema({
    title: String,
    id:String,
    author: String,
    extract:String,
    content:String,
    meta: {
        createAt:{
            type:Date,
            default: Date.now()
        },
        updateAt:{
            type:Date,
            default: Date.now()
        }
    }
})

//存储前的钩子
ArticleSchema.pre('save', function (next) {
    if (this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now();
    }else {
        this.meta.upDateAt = Date.now();
    }
    next();
});

//自定义的存储过程
ArticleSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function(id,cb){
        return this
            .findOne({id:id})
            .exec(cb);
    }
}


module.exports = ArticleSchema;