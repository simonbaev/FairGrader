/* jshint esnext: true */
//-- Modules
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const sharedSession = require('express-socket.io-session');
const socketio = require('socket.io');
const mongoose = require('mongoose');
//-- Routes
const evaluation = require('./routes/eval');
const init = require('./routes/init');
const index = require('./routes/index');
const login = require('./routes/login');
const password = require('./routes/password');
const email = require('./routes/emailLink');
const reports = require('./routes/reports');
const signup = require('./routes/signup');
const logout = require('./routes/logout');
//-- Express initialization
const io = new socketio();
const app = express();
const session = expressSession({
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
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('socketio', io);
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/eval', evaluation);
app.use('/email', email);
app.use('/login', login);
app.use('/reports', reports(io.of('/reports').use(sharedSession(session))));
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
