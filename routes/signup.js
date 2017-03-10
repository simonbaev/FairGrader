var express = require('express');
var router = express.Router();
var User = require('../lib/models/user');

router.get('/', function (req, res, next) {
	res.render('signup',{
		session: req.session,
	});
});

router.post('/', function (req, res, next) {
	if(req.body.isCheck && req.body.isCheck.toLowerCase() === 'true') {
		User.findOne({email: req.body.email}, function(err,user){
			if(err) {
				return next(err);
			}
			res.setHeader('Content-Type', 'application/json');
			if(user) {
				res.send({
					status: 1,
					message: 'This e-mail already registered'
				});
			}
			else {
				if(/[@](radar[.])?gsw[.]edu$/.test(req.body.email)) {
					res.send({
						status: 0
					});
				}
				else {
					res.send({
						status: 2,
						message: 'Official GSW E-mail address must be used for registration'
					});
				}
			}
		});
	}
	else {
		if(/[@](radar[.])?gsw[.]edu$/.test(req.body.email)) {
			new User({
				email: req.body.email,
				pass: req.body.password,
				faculty: /[@]gsw[.]edu$/.test(req.body.email)
			})
			.save(function(err, user){
				if(err) {
					return next(err);
				}
				req.session.uid = user._id;
				req.session.name = user.name;
				res.redirect(req.session.next || '/');
			});
		}
		else {
			return next(new Error('Official GSW E-mail address must be used for registration'));
		}
	}
});

module.exports = router;
