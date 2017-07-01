/* jshint esnext: true */

const async = require('async');
const User = require('../models/user');

exports.setup = function(next) {
	console.log('Adding user accounts...');
	const fnUserArray = [];
	const users = [
		{
			email: "simon.baev@gsw.edu",
			pass: "abcd1234",
			faculty: true,
			name: 'Simon Baev'
		},
	]
	.forEach(function(userItem){
		let user = new User(userItem);
		fnUserArray.push(user.save.bind(user));
	});
	async.parallel(fnUserArray, function(err, users){
		if(err) {
			return next(err);
		}
		next(null, 'Users (' + users.length + ')');
	});
};