const express = require('express');
const path = require('path');
const routes = require('./routes');
const config =require('config-lite')(path.join(__dirname,"config"));
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog');

var app = express();

app.set('views','./dist');
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

//挂载静态资源
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist/index')));
//session中间件
app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge // 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new MongoStore({ // 将 session 存储到 mongodb
        url: config.mongodb // mongodb 地址
    })
}));
app.use(flash())

// app.get('/', function(req, res) {
//     res.render("index/index");
//   })
app.use((req,res,next) =>{
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})
routes(app);

var server = app.listen(config.port,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})