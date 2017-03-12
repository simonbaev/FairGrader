/*jshint esnext: true*/

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Token = require('../lib/models/tokens');

router.get('/', function (req, res, next) {
	Token.findOne({uuid: req.query.id}).lean().exec(function(err, token){
		if(err) {
			return next(err);
		}
		if(!token) {
			return res.render('restore', {
				status: 1,
				message: 'Security token is incorrect or has been expired, please repeat password recovery process',
				session: req.session
			});
		}
		res.render('restore', {
			status: 0,
			token: token._id,
			session: req.session
		});
	});
});

router.post('/data', function (req, res, next) {
	console.log(req.body);
	res.redirect('/login');
});

router.post('/request', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	User.find({
		email: req.body.email
	})
	.lean()
	.exec(function(err,users){
		if(err) {
			return res.send({
				status: 1,
				message: err.message()
			});
		}
		if(users.length > 2) {
			return res.send({
				status: 2,
				message: 'There exist several users with the same e-mail. Please contact site administrator.'
			});
		}
		if(!users || !users.length) {
			return res.send({
				status: 3,
				message: 'E-mail is not recognized. Please sign up to create an account.'
			});
		}
		//-- Send e-mail
		new Token({
			target: {
				type: 'passwordRestore',
				id: users[0]._id
			}
		})
		.save(function(err, token){
			if(err) {
				return res.send({
					status: 4,
					message: 'Cannot generate security token'
				});
			}
			console.log(token);
			res.send({
				status: 0,
				message: 'An e-mail has been just sent to the provided e-mail address.'
			});
		});
	});
});

module.exports = router;