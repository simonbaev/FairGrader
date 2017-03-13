/* jshint esnext: true */

var express = require('express');
var basicAuth = require('basic-auth');
var assessmentData = require('../lib/data/assessment');
var contributionData = require('../lib/data/contribution');
var projectData = require('../lib/data/project');
var userData = require('../lib/data/user');
var tokenData = require('../lib/data/token');
var router = express.Router();

var auth = function(req, res, next) {
	function unauthorized(res, showDialog) {
		if(showDialog) {
			res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		}
		return res.status(401).render('401');
	}
	var user = basicAuth(req);
	if (!user || !user.name || !user.pass) {
		return unauthorized(res, true);
	}
	if (user.name === 'foo' && user.pass === 'bar') {
		return next();
	}
	else {
		return unauthorized(res, false);
	}
};

router.get('/', auth, function(req, res, next) {
	let report = [];
	req.session.destroy(function(err) {
		if (err) {
			return next(err);
		}
		[
			{
				fn: assessmentData.setup,
				description: 'Initialization of assessment data...'
			},
			{
				fn: contributionData.setup,
				description: 'Initialization of contribution data...'
			},
			{
				fn: tokenData.setup,
				description: 'Initialization of token data...'
			},
			{
				fn: projectData.setup,
				description: 'Initialization of project data...'
			},
			{
				fn: userData.setup,
				description: 'Initialization of user data...'
			}
		]
		.forEach(function(entry,index,array){
			entry.fn.call(null, function(err, data){
				if(err) {
					return next(err);
				}
				report.push(entry.description + "Created " + data.length + " object(s)");
				console.log(entry.description, "Created " + data.length + " object(s)");
				if(index == (array.length-1)) {
					res.render('init', {
						report: report,
						session: req.session,
					});
				}
			});
		});
	});
});

module.exports = router;
