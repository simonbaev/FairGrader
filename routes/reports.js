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
		if(err || !user) {
			return res.render('reports', {
				status: 1,
				message: 'Cannot retrieve user details',
				session: req.session
			});
		}
		let data = {};
		Contribution.find().lean().exec(function(err,contributions){
			if(err) {
				return res.render('reports', {
					status: 2,
					message: 'Cannot retrieve contribution data',
					session: req.session
				});
			}
			for(let contribution of contributions) {
				if(!data[contribution.term]) {
					data[contribution.term] = {};
				}
				let term = data[contribution.term];
				if(!term[contribution.course]) {
					term[contribution.course] = {};
				}
				let course = term[contribution.course];
				if(!course[contribution.project]) {
					course[contribution.project] = {
						title: contribution.title,
						students: {}
					};
				}
				let project = course[contribution.project];
				for(let student of contribution.members){
					if(user.faculty || user.email === student.email) {
						if(!project.students[student.email]) {
							project.students[student.email] = {
								name: student.name || 'Student',
								topic: contribution.topic,
								scores: {
									labels: [],
									criteria: {
										presentation: [],
										progress: [],
										overall: [],
										calculated: []
									}
								}
							};
						}
						let scores = project.students[student.email].scores;
						scores.labels.push(user.faculty ? contribution.email : null);
						scores.criteria.presentation.push(student.presentation);
						scores.criteria.progress.push(student.progress);
						scores.criteria.overall.push(contribution.overall);
						scores.criteria.calculated.push(contribution.overall / 100 * (student.progress * 0.5 + student.presentation * 0.5));
					}
				}
			}
			for(let term in data) {
				for(let course in data[term]) {
					for(let project in data[term][course]) {
						if(!Object.keys(data[term][course][project].students).length) {
							delete data[term][course][project];
						}
					}
					if(!Object.keys(data[term][course]).length) {
						delete data[term][course];
					}
				}
				if(!Object.keys(data[term]).length) {
					delete data[term];
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