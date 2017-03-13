/*jshint esnext: true*/

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Token = require('../lib/models/token');
const EmailTemplate = require('email-templates').EmailTemplate;
const mailer = require('../lib/mailer');
const path = require('path');

router.get('/', function (req, res, next) {
	Token.findOne({uuid: req.query.id}).lean().exec(function(err, token){
		if(err) {
			return next(err);
		}
		if(!token || token.used) {
			return res.render('restore', {
				status: 1,
				message: 'Security token is incorrect, has been used or has been expired, please repeat password recovery process',
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
	res.setHeader('Content-Type', 'application/json');
	Token.findById(req.body.token, function(err, token) {
		if(err) {
			return res.send({
				status: 1,
				message: 'Token retrieval error: ' + err.message
			});
		}
		if(!token) {
			return res.send({
				status: 2,
				message: 'Security token is incorrect or has been expired, please repeat password recovery process'
			});
		}
		if(token.target.type === 'passwordRestore') {
			User.findById(token.target.id, function(err, user){
				if(err) {
					return res.send({
						status: 3,
						message: 'User retrieval error: ' + err.message
					});
				}
				if(!user) {
					return res.send({
						status: 4,
						message: 'User account referred in the token is invalid'
					});
				}
				user.pass = req.body.password;
				user.save(function(err, user){
					if(err) {
						return res.send({
							status: 5,
							message: 'User account update error: ' + err.message
						});
					}
					token.used = true;
					token.save(function(err){
						if(err) {
							return res.send({
								status: 6,
								message: 'Security token cannot be updated: ' + err.message
							});
						}
						res.send({
							status: 0,
							message: 'Your password has been successfully updated. You will be redirected to login page momentarily.'
						});
					});
				});
			});
		}
	});
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
				message: 'E-mail address is not recognized. Please sign up to create an account.'
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
			var port = req.app.settings.port;
			var host = req.protocol + '://' + req.hostname  + ':' + port;
			new EmailTemplate(path.join(__dirname,'..','templates','passwordRestore')).render(
				{
					token: token.uuid,
					name: users[0].name.split(/\s/)[1],
					host: host,
				},
				function(err,result){
					if(err) {
						return res.send({
							status: 5,
							message: 'Cannot generate password recovery e-mail'
						});
					}
					mailer.transporter.sendMail(
						{
							from: 'FairGrader Mailing Robot <noreply@fg.gswcm.net>',
							to: req.body.email.trim(),
							subject: 'FairGrader password recovery',
							html: result.html,
							text: result.text
						},
						function(err, info){
							if(err) {
								return res.send({
									status: 6,
									message: 'SMTP error: ' + err.message
								});
							}
							//-- Success
							res.send({
								status: 0,
								message: 'An e-mail has been just sent to the provided e-mail address.'
							});
						}
					);
				}
			);
		});
	});
});

module.exports = router;