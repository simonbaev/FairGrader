/* jshint esnext: true */

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Project = require('../lib/models/project');
const Report = require('../lib/models/report');
const async = require('async');

function termCodeToString(termCode) {
	let year = termCode.slice(0,4);
	let semester = {'02':'Spring', '05':'Summer', '08':'Fall'}[termCode.slice(4)];
	return semester + ' ' + year;
}

router.get(['/:term', '/:term/:course', '/:term/:course/:project'], function (req, res, next) {
	if(!req.session.uid) {
		req.session.next = req.baseUrl + req.path;
		return res.redirect('/login');
	}
	let term = req.params.term;
	let course = req.params.course;
	let project = req.params.project;
	if((term && /^20[012]\d0[257]$/.test(term)) && (course && /^[A-Z]{3,5}_\d{3,5}$/.test(course)) && project) {
		Project.findOne({
			active: true,
			term: term,
			'course.key': course,
			'project.key': project
		})
		.lean()
		.exec(function(err,projectItem){
			if(err || !projectItem) {
				return res.redirect(req.baseUrl);
			}
			res.render('eval_process.pug', {
				session: req.session,
				id: projectItem._id,
				title: {
					course: projectItem.course.key.replace('_',' ') + ' ' + projectItem.course.title,
					project: projectItem.project.title,
				}
			});
		});
	}
	else {
		res.redirect(req.baseUrl);
	}
});

router.post('/', function(req,res,next){
	res.setHeader('Content-Type', 'application/json');
	if(!req.session.uid) {
		return res.send({
			status: 1,
			message: 'Session is not authenticated'
		});
	}
	User.findById(req.session.uid, function(err, user){
		if(err || !user) {
			return res.send({
				status: 2,
				message: 'Cannot retrieve user account'
			});
		}
		Project.findById(req.body.project, function(err, projectItem) {
			if(err || !projectItem) {
				return res.send({
					status: 3,
					message: 'Cannot synchronize submission with the selected project'
				});
			}
			/*
			if(projectItem.students.map(function(student){
				return student.email;
			}).indexOf(user.email) === -1) {
				//-- This user cannot contribute to the evaluation
				return res.send({
					status: 100,
					message: 'You are not authorized to contribute to this project'
				});
			}
			*/
			//-- Create a set of Reports for this particular contribution
			let reports = [];
			let members = {};
			for(let member of req.body.members) {
				if(member.active) {
					members[member.email] = member;
				}
			}
			//-- In the active project find the topic that matches topic in contribution
			let topic = projectItem.topics.find(function(topic){
				return topic.key === req.body.topic;
			});
			topic.students.forEach(function(studentEmail) {
				if(studentEmail in members) {
					//-- Check if report with same details already exists
					Report.findOne({
						'term': projectItem.term,
						'course.key': projectItem.course.key,
						'project.key': projectItem.project.key,
						'topic.key': topic.key,
						'contributor.email': user.email,
						'email': studentEmail
					})
					.exec(function(err,reportItem){
						if(err) {
							return res.send({
								status: 5,
								message: 'Cannot access reports collection'
							});
						}
						if(!reportItem) {
							let report = new Report({
								term: projectItem.term,
								course: {
									key: projectItem.course.key,
									title: projectItem.course.title
								},
								project: {
									key: projectItem.project.key,
									title: projectItem.project.title
								},
								topic: {
									key: topic.key,
									title: topic.title
								},
								email: studentEmail,
								facultyAccess: projectItem.facultyAccess,
								contributor: {
									email: user.email,
									score: parseFloat(members[studentEmail].value),
									comment: members[studentEmail].comment || null
								}
							});
							reports.push(report.save.bind(report));
						}
						else {
							//-- report needs to be overriden
							reportItem.contributor.score = parseFloat(members[studentEmail].value);
							reportItem.contributor.comment = members[studentEmail].comment || null;
							reports.push(reportItem.save.bind(reportItem));
						}
						if(reports.length === Object.keys(members).length) {
							async.parallel(reports,function(err, reports) {
								if(err) {
									return res.send({
										status: 4,
										message: 'Cannot save reports'
									});
								}
								console.log(reports);
								return res.send({
									status: 0,
									message: 'Success'
								});
							});
						}
					});
				}
			});

		});
	});
});

router.get('/', function (req, res, next) {
	if(!req.session.uid) {
		req.session.next = req.baseUrl + req.path;
		return res.redirect('/login');
	}
	User.findById(req.session.uid, function(err, user){
		if(err || !user) {
			return res.render('eval_selector', {
				status: 1,
				message: 'Cannot retrieve user details',
				session: req.session
			});
		}
		res.render('eval_selector', {
			status: 0,
			session: req.session
		});
	});
});

module.exports = function(io) {
	io
	.on('connect', function(socket){
		socket
		.on('getProjects', function(request, cb) {
			User.findById(socket.handshake.session.uid, function(err, user){
				if(err || !user) {
					return cb(new Error('Cannot retrieve details on authenticated session, please re-login'));
				}
				Project.find({
					$and: [
						{ active: true	},
						user.faculty ?	{ facultyAccess: { $elemMatch: {	$eq: user.email } } } : { "students.email": user.email }
					]
				})
				.lean()
				.exec(function(err, projects){
					if(err || !projects.length) {
						return cb(new Error('Cannot find active projects'));
					}
					let data = {};
					projects.forEach(function(projectItem){
						let students = projectItem.students.map(function(entry){
							return entry.email;
						});
						if(!data[projectItem.term]) {
							data[projectItem.term] = {
								title: termCodeToString(projectItem.term),
								courses: {}
							};
						}
						let term = data[projectItem.term];
						if(!term.courses[projectItem.course.key]) {
							term.courses[projectItem.course.key] = {
								title: projectItem.course.title,
								projects: {}
							};
						}
						let course = term.courses[projectItem.course.key];
						if(!course.projects[projectItem.project.key]) {
							course.projects[projectItem.project.key] = {
								title: projectItem.project.title,
							};
						}
						let project = course.projects[projectItem.project.key];
					});
					cb(null, data);
				});
			});
		})
		.on('getProjectDetails', function(id, cb){
			Project.findById(id)
			.lean()
			.exec(function(err,projectItem){
				if(err || !projectItem) {
					return cb(new Error('Cannot retrieve scpecified project for evaluation'));
				}
				cb(null, projectItem);
			});
		});
	});
	return router;
};