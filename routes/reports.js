/* jshint esnext: true */

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Contribution = require('../lib/models/contribution');

router.get('/', function (req, res, next) {
	if(!req.session.uid) {
		req.session.next = req.baseUrl + req.path;
		return res.redirect('/login');
	}
	User.findById(req.session.uid, function(err, user){
		if(err) {
			return res.render('reports', {
				status: 1,
				message: 'Cannot retrieve user details',
				session: req.session
			});
		}
		let data = {
			term: '201702',
			courses: {},
		};

		Contribution.find().lean().exec(function(err,contributions){
			if(err) {
				return res.render('reports', {
					status: 2,
					message: 'Cannot retrieve contribution data'
				});
			}
			for(let contribution of contributions) {
				if(!data.courses[contribution.course]) {
					data.courses[contribution.course] = {
						projects: {}
					};
				}
				let course = data.courses[contribution.course];
				if(!course.projects[contribution.project]) {
					course.projects[contribution.project] = {
						title: contribution.title,
						students: {}
					};
				}
				let project = course.projects[contribution.project];
				for(let student of contribution.members){
					if(!project.students[student.email]) {
						project.students[student.email] = {
							name: student.name || 'Student',
							topic: contribution.topic,
							scores: []
						};
					}
					project.students[student.email].scores.push({
						contributor: contribution.email,
						overall: contribution.overall,
						progress: student.progress,
						presentation: student.presentation,
						calculated: contribution.overall / 100 * (student.progress * 0.5 + student.presentation * 0.5)
					});
				}
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