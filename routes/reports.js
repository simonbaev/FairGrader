/* jshint esnext: true */

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Report = require('../lib/models/report');
const emailToName = require('../lib/commons').emailToName;
const async = require('async');

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
			return res.render('reports.pug', {
				status: 1,
				message: 'Cannot retrieve user details',
				session: req.session
			});
		}
		let data = {};
		Report.find(user.faculty ? {facultyAccess: {$elemMatch: {$eq: user.email}}} : { email: user.email })
		.lean()
		.exec(function(err,reports){
			if(err || !reports) {
				return res.render('reports.pug', {
					status: 2,
					message: 'Cannot retrieve report data',
					session: req.session
				});
			}
			res.render('reports.pug', {
				status: 0,
				session: req.session
			});
		});
	});
});

module.exports = function(io) {
	io
	.on('connect', function(socket){
		socket.on('getData',function(reply){
			User.findById(socket.handshake.session.uid, function(err, user){
				let emailsForResolution = [];
				let data = {};
				Report.find(user.faculty ? {facultyAccess: {$elemMatch: {$eq: user.email}}} : { email: user.email })
				.lean()
				.exec(function(err, reports){
					if(!reports) {
						return reply(null);
					}
					data = {
						names: {}
					};
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
							//-- Those who receive a grade
							gradees: [],
							//-- Those who give the grade
							graders: [],
							//-- Contribution objects referenced by Gradees and Graders
							contributions: {},
							//-- Project topics
							topics: {}
						};
						if(project.gradees.indexOf(report.email) === -1) {
							project.gradees.push(report.email);
						}
						if(report.contributor.email !== report.email) {
							//-- Allow only non-self-evaluated reports
							if(project.graders.indexOf(report.contributor.email) === -1) {
								project.graders.push(report.contributor.email);
							}
							if(!project.topics[report.email]) {
								//-- There could be many reports for the same student with the same topic
								project.topics[report.email] = {
									key: report.topic.key,
									title: report.topic.title
								};
							}
							//-- Map contribution to a particular Gradee and Grader
							if(!project.contributions[report.email]) {
								project.contributions[report.email] = {};
							}
							project.contributions[report.email][report.contributor.email] = {
								score: report.contributor.score,
								comment: report.contributor.comment
							};
							//-- Add Gradee's and Grader's emails into the list for email -> name resolution
							if(emailsForResolution.indexOf(report.email) === -1) {
								emailsForResolution.push(report.email);
							}
							if(emailsForResolution.indexOf(report.contributor.email) === -1) {
								emailsForResolution.push(report.contributor.email);
							}
						}
					}
					async.parallel(emailsForResolution.map(function(email){
						return emailToName.bind(email);
					}),
					function(err, results){
						for(let emailNamePair of results) {
							if(!data.names[emailToName.email]) {
								data.names[emailNamePair.email] = emailNamePair.name;
							}
						}
						reply(data);
					});
				});
			});

		});
	});
	return router;
};