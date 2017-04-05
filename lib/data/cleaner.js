/* jshint esnext: true */

const mongoose = require('mongoose');

exports.setup = function(next) {
	console.log('Dropping database...');
	mongoose.connection.dropDatabase(function(err) {
		next(err,'DB dropped');
	});
};