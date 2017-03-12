var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var evaluation = require('./routes/eval');
var oldIndex = require('./routes/oldIndex');
var init = require('./routes/init');
var index = require('./routes/index');
var login = require('./routes/login');
var restore = require('./routes/restore');
var signup = require('./routes/signup');
var logout = require('./routes/logout');
var confirm = require('./routes/confirm');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'Get Away From Her You Bitch',
	cookie: {
		maxAge: 75 * 60 * 1000
	},
	store: new(require('express-sessions'))({
		storage: 'mongodb',
		instance: mongoose,
		db: 'fg',
		collection: 'sessions',
		expire: 86400
	})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/eval', evaluation);
app.use('/login', login);
app.use('/confirm', confirm);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/restore', restore);
app.use('/init', init);
app.use('/old', oldIndex);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
