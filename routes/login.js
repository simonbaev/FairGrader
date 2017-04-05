/*jshint esnext: true*/

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Student = require('../lib/models/student');

const authenticateUser = function(email,password,fn) {
	User.findOne({email: email},function(err,user){
		if(err) {
			return fn(err);
		}
		if(!user) {
			return fn(null,false);
		}
		user.checkPassword(password, function(err,flag){
			if(err) {
				return fn(err);
			}
			return fn(null,flag ? user : null);
		});
	});
};

router.get('/', function (req, res, next) {
	res.render('login',{
		session: req.session,
	});
});

router.post('/', function (req, res, next) {
	authenticateUser(req.body.email, req.body.password, function (err, user) {
		if(err) {
			return next(err);
		}
		if(req.body.isCheck && req.body.isCheck.toLowerCase() === 'true') {
			res.setHeader('Content-Type', 'application/json');
			res.send({
				status: user ? 0 : 1,
				message: user ? 'Success' : 'E-Mail and/or password are incorrect'
			});
		}
		else {
			if(!user) {
				return next(new Error('Username and/or password are incorrect'));
			}
			Student.findOne({email:user.email}).lean().exec(function(err, entry){
				let nextHop = req.session.next || '/';
				req.session.faculty = user.faculty;
				req.session.uid = user._id;
				req.session.name = user.name || (user.faculty ? 'Faculty' : (!err && entry && entry.lastName && entry.firstName ? (entry.firstName + ' ' + entry.lastName) : 'Student'));
				res.redirect(nextHop);
			});
		}
	});
});

module.exports = router;
