/* jshint esnext: true */

const express = require('express');
const basicAuth = require('basic-auth');
const cleaner = require('../lib/data/cleaner');
const reportData = require('../lib/data/report');
const projectData = require('../lib/data/project');
const userData = require('../lib/data/user');
const router = express.Router();
const async = require('async');

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
		async.series([
			cleaner.setup,
			projectData.setup,
			function(next) {
				async.parallel([
					reportData.setup,
					userData.setup
				],
				function(err, result) {
					if(err) {
						return next(err);
					}
					next(null, result.join('; '));
				});
			}
		],
		function(err, results) {
			if(err) {
				return next(err);
			}
			console.log(JSON.stringify(results,null,3));
			res.render('init', {
				report: results.join('; '),
				session: req.session,
			});
		});
	});
});

module.exports = router;
