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
		{
			email: "bbazemo2@radar.gsw.edu",
			name: "Bazemore, Brenton R.",
			pass: "abc123"
		},
		{
			email: "abittle@radar.gsw.edu",
			name: "Bittle, Alexander",
			pass: "abc123"
		},
		{
			email: "cclemen3@radar.gsw.edu",
			name: "Clements, Cody L.",
			pass: "abc123"
		},
		{
			email: "ccrawfo4@radar.gsw.edu",
			name: "Crawford, Cedric A.",
			pass: "abc123"
		},
		{
			email: "hexum@radar.gsw.edu",
			name: "Exum, Haley E.",
			pass: "abc123"
		},
		{
			email: "omartine@radar.gsw.edu",
			name: "Martinez, Oscar R.",
			pass: "abc123"
		},
		{
			email: "mperry11@radar.gsw.edu",
			name: "Perry, Meghann A.",
			pass: "abc123"
		},
		{
			email: "tpittma1@radar.gsw.edu",
			name: "Pittman, Tabias R.",
			pass: "abc123"
		},
		{
			email: "lreed1@radar.gsw.edu",
			name: "Reed, Leonard L.",
			pass: "abc123"
		},
		{
			email: "hrobins3@radar.gsw.edu",
			name: "Robinson, Hector A.",
			pass: "abc123"
		},
		{
			email: "bstewar3@radar.gsw.edu",
			name: "Stewart, Braxston C.",
			pass: "abc123"
		},
		{
			email: "tswan@radar.gsw.edu",
			name: "Swan, Thomas C.",
			pass: "abc123"
		},
		{
			email: "jtrinh@radar.gsw.edu",
			name: "Trinh, Joseph N.",
			pass: "abc123"
		},
		{
			email: "twashbur@radar.gsw.edu",
			name: "Washburn, Taylor Z.",
			pass: "abc123"
		},
		{
			email: "asolomo3@radar.gsw.edu",
			name: "Solomon, Ahmad",
			pass: "abc123"
		}
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