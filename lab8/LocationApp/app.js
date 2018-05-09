var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
const csrf = require('csurf');
const session = require('express-session');
const validator = require('express-validator');

var indexRouter = require('./routes/index');
var locationsRouter = require('./routes/locations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'my secret keys 123',
  resave: false,
  saveUninitialized: true
}));
app.use(csrf());
app.use(function (request, response, next) { 
	response.locals.csrftoken = request.csrfToken(); 
	next(); 
});
app.use(validator());
app.use(lessMiddleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/public/stylesheets'));
app.use('/js', express.static(__dirname + '/public/javascripts')); 
app.use('/images', express.static(__dirname + '/public/images'));  

app.use('/', indexRouter);
app.use('/locations', locationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
