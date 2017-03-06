/* jshint esnext: true */
var express = require('express');
var randomstring = require('randomstring');
var Assessment = require('../lib/models/assessment');
var Contribution = require('../lib/models/contribution');
var path = require('path');
var router = express.Router();

router.get('/', function(req, res, next) {
	let fakeID = randomstring.generate({
		length: 24,
		charset: 'abcdef0123456789'
	});
	let id = (req.query.id && req.query.id.length === 24) ? req.query.id : fakeID;
	Contribution.findById(id, function(err, contribution){
		if(err) {
			return next(err);
		}
		if(contribution) {
			if(contribution.expired) {
				res.render('confirm',{
					message: "Link expired"
				});
			}
			else if(contribution.confirmed) {
				res.render('confirm',{
					message: "Already confirmed"
				});
			}
			else {
				res.render('confirm',{
					message: "Confirmed, thank you."
				});
				//-- Success
				contribution.confirmed = true;
				contribution.save(function(err, contribution){
					console.log(JSON.stringify(contribution,null,3));
				});
			}
		}
		else {
			res.render('confirm',{
				message: "Not found"
			});
		}
		return;
	});

});

module.exports = router;