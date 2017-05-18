var express = require('express');
var app = express();

app.set('views','./dist');
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

//挂载静态资源
app.use(express.static('dist'));

app.get('/', function(req, res) {
    res.render("login/index");
  })

var server = app.listen(8080,function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})