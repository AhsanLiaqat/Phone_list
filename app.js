var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var jade = require('jade');


var index = require('./routes/index');
var users = require('./routes/users');
var forms = require('./routes/forms');


var app = express();


// var cons = require('consolidate');


app.set('view engine', 'jade');
app.enable('trust proxy');




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>
	res.sendFile('index.html',{
		root:path.join(__dirname, 'public')
}));
app.use('/users', users);
app.use('/forms', forms);


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
