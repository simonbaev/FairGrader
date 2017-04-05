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
		},
		{
			email: "aander12@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "randers6@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "bbrown40@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "jdeal1@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "hexum@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "mhelms3@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "jhobbs2@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "whubbar1@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "sjones59@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "jkelly11@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "clander1@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "omartine@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "credmon1@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "lreed1@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "drobins6@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "psloan@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "bstewar3@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "tswan@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "jtrinh@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "vtripi@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "kfan@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "agangji@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "hhong@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "bmarsha4@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "mpowel15@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "kreddiva@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "ashah1@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "psingh@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "rsmith36@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "athoseby@radar.gsw.edu",
			pass: "abc123"
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