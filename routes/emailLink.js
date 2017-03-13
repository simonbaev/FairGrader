/*jshint esnext: true*/

const express = require('express');
const router = express.Router();
const Token = require('../lib/models/token');
const path = require('path');

router.get('/', function (req, res, next) {
	Token.findOne({uuid: req.query.uuid}).lean().exec(function(err, token){
		if(err) {
			return next(err);
		}
		if(!token || (token &&  (!token.target || !token.target.view))) {
			return next(new Error('Invalid (potentially expired) link'));
		}
		if(token.used) {
			return res.render(token.target.view, {
				status: 1,
				message: 'This link has already been used. Please follow necessary steps to renew it.',
				session: req.session
			});
		}
		res.render(token.target.view, {
			status: 0,
			token: token._id,
			session: req.session
		});
	});
});

module.exports = router;