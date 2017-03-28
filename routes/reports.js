/* jshint esnext: true */

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Report = require('../lib/models/report');

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
		Report.find(
			user.faculty ? {facultyEmail: user.email} : { email: user.email }
		)
		.lean()
		.exec(function(err,reports){
			if(err) {
				return res.render('reports', {
					status: 2,
					message: 'Cannot retrieve contribution data',
					session: req.session
				});
			}
			data = {};
			for(let report of reports) {
				let term = data[report.term] = data[report.term] || {
					title: termCodeToString(report.term)
				};
				let course = term[report.course.key] = term[report.course.key] || {
					title: report.course.title
				};
				let project = course[report.project.key] = course[report.project.key] || {
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
				student.contributions[report.contributor.email] = report.contributor.score;
			}
			res.render('reports', {
				status: 0,
				data: data,
				session: req.session
			});
		});
	});
});

module.exports = router;