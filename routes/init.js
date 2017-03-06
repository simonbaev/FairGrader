var express = require('express');
var basicAuth = require('basic-auth');
var assessmentData = require('../lib/data/assessment');
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
	req.session.destroy(function(err) {
		if (err) {
			return next(err);
		}
		[
			{
				fn: assessmentData.setup,
				description: 'Initialization of assessment data...'
			},
		]
		.forEach(function(entry,index,array){
			entry.fn.call(null, function(err, data){
				if(err) {
					return next(err);
				}
				console.log(entry.description,"Created " + data.length + " object(s)");
				if(index == (array.length-1)) {
					res.render('init');
				}
			});
		});
	});
});

module.exports = router;
