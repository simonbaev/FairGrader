/* jshint esnext: true */

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Token = require('../lib/models/token');
const uuid = require('uuid');
const EmailTemplate = require('email-templates').EmailTemplate;
const mailer = require('../lib/mailer');
const path = require('path');

router.get('/', function (req, res, next) {
	res.render('signup',{
		session: req.session,
	});
});

router.post('/', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	User.findOne({email: req.body.email}, function(err,user){
		if(err) {
			return res.send({
				status: 1,
				message: 'Cannot analyze provided e-mail: ' + err.message
			});
		}
		if(user) {
			return res.send({
				status: 2,
				message: 'This account is already in use. Please login or recover forgotten password'
			});
		}
		if(!/[@](radar[.])?gsw[.]edu$/.test(req.body.email)) {
			return res.send({
				status: 3,
				message: 'This is not an official GSW e-mail'
			});
		}
		let isFaculty = /[@]gsw[.]edu$/.test(req.body.email);
		new User({
			email: req.body.email,
			pass: uuid.v4(),
			name: isFaculty ? 'Faculty' : 'Student',
			faculty: isFaculty
		})
		.save(function(err, user){
			if(err) {
				return res.send({
					status: 4,
					message: 'Cannot create a new user account: ' + err.message
				});
			}
			new Token({
				target: {
					view: 'passwordSetup',
					id: user._id
				}
			})
			.save(function(err, token){
				if(err) {
					return res.send({
						status: 5,
						message: 'Cannot generate security token'
					});
				}
				var port = req.app.settings.port;
				var host = req.protocol + '://' + req.hostname  + ':' + port;
				new EmailTemplate(path.join(__dirname,'..','templates','accountConfirmation')).render(
					{
						token: token.uuid,
						name: user.name || 'User',
						host: host,
					},
					function(err,result){
						if(err) {
							return res.send({
								status: 6,
								message: 'Cannot generate account activation e-mail'
							});
						}
						mailer.transporter.sendMail(
							{
								from: 'FairGrader Mailing Robot <noreply@fg.gswcm.net>',
								to: req.body.email.trim(),
								subject: 'FairGrader account activation',
								html: result.html,
								text: result.text
							},
							function(err, info){
								if(err) {
									return res.send({
										status: 7,
										message: 'SMTP error: ' + err.message
									});
								}
								//-- Success
								res.send({
									status: 0,
									message: 'An account activation e-mail has been sent to the providfed e-mail.'
								});
							}
						);
					}
				);
			});
		});
	});
});

module.exports = router;
