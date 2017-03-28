/* jshint esnext: true */

const express = require('express');
const basicAuth = require('basic-auth');
const assessmentData = require('../lib/data/assessment');
const reportData = require('../lib/data/report');
const projectData = require('../lib/data/project');
const userData = require('../lib/data/user');
const tokenData = require('../lib/data/token');
const router = express.Router();
const series = require("async/series");

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
		series([
				projectData.setup,
				reportData.setup,
				tokenData.setup,
				userData.setup
			],
			function(err, results) {
				console.log(JSON.stringify(results,null,3));
				res.render('init', {
					report: results.join('; '),
					session: req.session,
				});
			}
		);
	});
});

module.exports = router;
