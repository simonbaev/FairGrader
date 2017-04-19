/* jshint esnext: true */

const express = require('express');
const router = express.Router();
const User = require('../lib/models/user');
const Project = require('../lib/models/project');

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
				term: term,
				course: course,
				project: project
			});
		});
	}
	else {
		res.redirect(req.baseUrl);
	}
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
					active: true
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
						if((!user.faculty && students.indexOf(user.email) !== -1) || user.faculty) {
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
						}
					});
					cb(null, data);
				});
			});
		})
		.on('getProjectDetails', function(request, cb){
			console.log(request);
			Project.findOne({
				active: true,
				term: request.term,
				'course.key': request.course,
				'project.key': request.project
			})
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