#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('fairgrader:server');
var http = require('http');
var mongoose = require('mongoose');


/**
 * Connect to MongoDB and return connection to set up event listeners
 */
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/fg').connection
.on('error', function(err) {
	console.error('MongoDB:', err.message);
	process.exit(200);
})
.once('open', function(){
	var port = normalizePort(process.env.PORT || '4000');
	app.set('port', port);
	var server = http.createServer(app);
	app.get('socketio').listen(server);
	server.listen(port);
	server.on('error', onServerError);
	server.on('listening', function(){
		var addr = server.address();
		var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
		debug('Listening on ' + bind);
	});
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
	var port = parseInt(val, 10);
	if (isNaN(port)) {
		// named pipe
		return val;
	}
	if (port >= 0) {
		// port number
		return port;
	}
	return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onServerError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}
	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}
