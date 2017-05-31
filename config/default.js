const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog:27017');


export default {
    mongoose: mongoose,
}