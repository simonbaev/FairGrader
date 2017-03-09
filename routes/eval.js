/* jshint esnext: true */
const express = require('express');
const path = require('path');
const router = express.Router();
const Project = require('../lib/models/project');

router.get(['/', '/:term', '/:term/:course', '/:term/:course/:project'], function(req, res, next) {
	if(!req.params.term || !/^\d{6}$/.test(req.params.term)) {
		console.log('DEBUG: ', 'Term parameter is not provided or incorrect', req.params.term);
		Project
		.find({
			active:true
		})
		.select('term course project')
		.exec(function(err, projectData) {
			if(err) {
				return next(err);
			}
			if(!projectData || !projectData.length) {
				res.render('eval', {
					type: 'error',
					message: 'Active items not found'
				});
				return;
			}
			if(projectData.length === 1) {
				res.redirect(req.baseUrl + '/' + projectData[0].term + '/' + projectData[0].course.code + '/' + projectData[0].project.key);
			}
			else {
				res.render('eval', {
					type: 'data',
					kind: 'listOfTerms',
					urlPrefix: req.baseUrl,
					data: projectData.map(function(item){
						return item.term;
					})
					.filter(function(elem,idx,arr){
						return arr.indexOf(elem) >= idx;
					})
				});
			}
		});
	}
	else {
		console.log('DEBUG: ', 'Term parameter is OK', req.params.term);
		if(!req.params.course || !/^[a-z]+[_]?\d+$/i.test(req.params.course)) {
			console.log('DEBUG: ', 'Course parameter is not provided or incorrect', req.params.course);
			Project
			.find({
				active: true,
				term: req.params.term,
			})
			.select('term course project')
			.exec(function(err, projectData) {
				if(err) {
					return next(err);
				}
				if(!projectData || !projectData.length) {
					res.render('eval', {
						type: 'error',
						message: 'Term not found'
					});
					return;
				}
				if(projectData.length === 1) {
					res.redirect(req.baseUrl + '/' + projectData[0].term + '/' + projectData[0].course.code + '/' + projectData[0].project.key);
				}
				else {
					res.render('eval', {
						type: 'data',
						kind: 'listOfCourses',
						urlPrefix: req.baseUrl + req.path,
						data: projectData.map(function(item){
							return item.course;
						})
						.filter(function(elem,idx,arr){
							return arr.map(function(entry){
								return entry.code;
							})
							.indexOf(elem.code) >= idx;
						})
					});
				}
			});
		}
		else {
			console.log('DEBUG: ', 'Course parameter is OK', req.params.course);
			if(!req.params.project || !/^\w+$/.test(req.params.project)) {
				console.log('DEBUG: ', 'Project parameter is not provided or incorrect', req.params.project);
				Project
				.find({
					active: true,
					term: req.params.term,
					'course.code': req.params.course
				})
				.select('term course project')
				.exec(function(err, projectData) {
					if(err) {
						return next(err);
					}
					if(!projectData || !projectData.length) {
						res.render('eval', {
							type: 'error',
							message: 'Course not found'
						});
						return;
					}
					if(projectData.length === 1) {
						res.redirect(req.baseUrl + '/' + projectData[0].term + '/' + projectData[0].course.code + '/' + projectData[0].project.key);
					}
					else {
						res.render('eval', {
							type: 'data',
							kind: 'listOfProjects',
							urlPrefix: req.baseUrl + req.path,
							data: projectData.map(function(item){
								return item.project;
							})
							.filter(function(elem,idx,arr){
								return arr.map(function(entry){
									return entry.key;
								})
								.indexOf(elem.key) >= idx;
							})
						});
					}
				});
			}
			else {
				console.log('DEBUG: ', 'Project parameter is OK ', req.params.project);
				Project
				.findOne({
					active: true,
					term: req.params.term,
					'course.code': req.params.course,
					'project.key': req.params.project
				})
				.exec(function(err, projectData) {
					if(err) {
						return next(err);
					}
					if(!projectData) {
						res.render('eval', {
							type: 'error',
							message: 'Project not found'
						});
						return;
					}
					res.render('eval', {
						type: 'data',
						kind: 'projectPage',
						data: projectData
					});
				});
			}
		}
	}
});

module.exports = router;
