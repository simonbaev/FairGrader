/* jshint esnext: true */

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Report = require('../lib/models/report');
const Student = require('../lib/models/student');

function termCodeToString(termCode) {
	let year = termCode.slice(0,4);
	let semester = {'02':'Spring', '05':'Summer', '08':'Fall'}[termCode.slice(4)];
	return semester + ' ' + year;
}

router.get('/', function (req, res, next) {
	if(!req.session.uid) {
		req.session.next = req.baseUrl + req.path;
		return res.redirect('/login');
	}
	User.findById(req.session.uid, function(err, user){
		if(err || !user) {
			return res.render('reports', {
				status: 1,
				message: 'Cannot retrieve user details',
				session: req.session
			});
		}
		let data = {};
		Report.find(user.faculty ? {facultyEmail: user.email} : { email: user.email })
		.lean()
		.exec(function(err,reports){
			if(err) {
				return res.render('reports', {
					status: 2,
					message: 'Cannot retrieve report data',
					session: req.session
				});
			}
			res.render('reports', {
				status: 0,
				session: req.session
			});
		});
	});
});

module.exports = function(io) {
	io
	.on('connect', function(socket){
		User.findById(socket.handshake.session.uid, function(err, user){
			let data = {};
			Report.find(user.faculty ? {facultyAccess: {$elemMatch: {$eq: user.email}}} : { email: user.email })
			.lean()
			.exec(function(err,reports){
				data = {};
				for(let report of reports) {
					let term = data[report.term] = data[report.term] || {
						title: termCodeToString(report.term),
						courses: {}
					};
					let course = term.courses[report.course.key] = term.courses[report.course.key] || {
						title: report.course.title,
						projects: {}
					};
					let project = course.projects[report.project.key] = course.projects[report.project.key] || {
						title: report.project.title,
						students: {}
					};
					let student = project.students[report.email] = project.students[report.email] || {
						topic: {
							key: report.topic.key,
							title: report.topic.title
						},
						contributions: {}
					};
					if(report.contributor.email !== report.email) {
						student.contributions[report.contributor.email] = {
							score: report.contributor.score,
							comment: report.contributor.comment
						};
					}
				}
				socket.emit('data', data);
			});
		});
	});
	return router;
};