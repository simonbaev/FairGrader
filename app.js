/* jshint esnext: true */

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const evaluation = require('./routes/eval');
const init = require('./routes/init');
const index = require('./routes/index');
const login = require('./routes/login');
const password = require('./routes/password');
const email = require('./routes/emailLink');
const reports = require('./routes/reports');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
const app = express();

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
app.use('/email', email);
app.use('/login', login);
app.use('/reports', reports);
app.use('/logout', logout);
app.use('/signup', signup);
app.use('/password', password);
app.use('/init', init);

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
