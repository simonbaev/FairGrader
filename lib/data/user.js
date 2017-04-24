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
			email: 's1@radar.gsw.edu',
			pass: 'abc123',
			name: 'Student 1'
		},
		{
			email: 's2@radar.gsw.edu',
			pass: 'abc123',
			name: 'Student 2'
		},
		{
			email: 's3@radar.gsw.edu',
			pass: 'abc123',
			name: 'Student 3'
		},
		{
			email: "aander12@radar.gsw.edu",
			pass: "$2a$12$lsUF60CkScD2g0CQpnmOEeGqOn2DHZCJT4j1Q.93fDEFTg/Ummt1y"
		},
		{
			email: "randers6@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "bbrown40@radar.gsw.edu",
			pass: "$2a$12$f41eai3zsXG.iiHGVFC9Ee3BgD8ijsG1cdxAi8PeJlUnrH.yF7I7S"
		},
		{
			email: "jdeal1@radar.gsw.edu",
			pass: "$2a$12$27FQyOS3DTbyNmL6lg1p5uZdacQlqSn04Wz1KeNdij.9gQm9eJe2W"
		},
		{
			email: "hexum@radar.gsw.edu",
			pass: "$2a$12$KUqnLbvnXuwnRUcke4zWnu2A94L7YIm.jNzwJqaGysP7QHITit5t2"
		},
		{
			email: "mhelms3@radar.gsw.edu",
			pass: "$2a$12$qBYA6P2/Keppb.g3U8O.8eHJRyKuIY8V6ske7IbSJHbLnoRzlcZOq"
		},
		{
			email: "jhobbs2@radar.gsw.edu",
			pass: "$2a$12$crbcKMmUG8w1SJtge5KfnueEPwgUNMUXsTD31EpEVVxv6OrPXthOG"
		},
		{
			email: "whubbar1@radar.gsw.edu",
			pass: "$2a$12$xNB3prKx2aXPOQaPZ96W9OMYJ1ldfRbTD34Opfe1KdkBMo.10LJwe"
		},
		{
			email: "sjones59@radar.gsw.edu",
			pass: "$2a$12$e3IS9.01ijMUSu9DERIqp.JbddWzkoqJXEJ/Ax2KfMBJmn7YGpVVC",
			name: "Sabrina Jordan"
		},
		{
			email: "jkelly11@radar.gsw.edu",
			pass: "$2a$12$I1NZB5369no1QmlUnqx3RuiHrl9VnXsSGEzYaHJr6e7.qgJPRB0OC"
		},
		{
			email: "clander1@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "omartine@radar.gsw.edu",
			pass: "$2a$12$Qweg9/7HGo8uqSPVMaSmn.tHW78U1AjUintMFNZYzBxlghkmq6J5G"
		},
		{
			email: "credmon1@radar.gsw.edu",
			pass: "$2a$12$LgIMGb3LAZ/QU9XVE0KfmOAkZQ6/mJooxF4kOYK7CkhkqSy.oSm6q"
		},
		{
			email: "lreed1@radar.gsw.edu",
			pass: "$2a$12$9K8rOGN3uBMDJwaX3iKXyOOIIolkK2NsQiK/y7rayBpqu5bZgWy.O"
		},
		{
			email: "drobins6@radar.gsw.edu",
			pass: "$2a$12$/C8e/YVhycN0ApFpxoM0/u4oXM1n7rt5bH.tYodVnimwMs3uhmqq2"
		},
		{
			email: "psloan@radar.gsw.edu",
			pass: "$2a$12$nc2cr6rX.AYkvDtAl2pCFOfSGnJ/lTVxtXEGPhVL8OR2rITXlyQRC"
		},
		{
			email: "bstewar3@radar.gsw.edu",
			pass: "abc123"
		},
		{
			email: "tswan@radar.gsw.edu",
			pass: "$2a$12$DQysME1TSbU995shEOzDxeMv0a6ChNiYW9Wwbzb04Q2S52Bwc3tMS"
		},
		{
			email: "jtrinh@radar.gsw.edu",
			pass: "$2a$12$OrdGC0rG5CvfExOvrZgQN.VqolbvnU.T1F/dwnFilhN.mUbImXfje"
		},
		{
			email: "vtripi@radar.gsw.edu",
			pass: "$2a$12$kLDwbdE0nRWEdSiZpJa/AOFxUp6GAdyrVlgb0cAVMcX/T3xS5HZ9."
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