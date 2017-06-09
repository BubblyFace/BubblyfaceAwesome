var mongoose = require("mongoose");

var photoSchema = mongoose.Schema({
    title:String,
    illustration: {
        type: String,
        default: this.title
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

//存储前的钩子
photoSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.upDateAt = Date.now();
    }
    next();
});

//自定义的存储过程
photoSchema.statics = {
    fetch: function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById: function (id, cb) {
        return this
            .findOne({
                id: id
            })
            .exec(cb);
    }
}

module.exports = photoSchema;