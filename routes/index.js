/* jshint esnext: true */
var express = require('express');
var Assessment = require('../lib/models/assessment');
var router = express.Router();

router.post('/', function(req, res, next) {
	console.log(JSON.stringify(req.body,null,3));
	res.setHeader('Content-Type', 'application/json');
	res.send({
		status: 0,
		message: 'OK'
	});
});

router.get('/', function(req, res, next) {
	Assessment.findOne({code:201702}).lean().exec(function(err, assessments){
		if(err) {
			return next(err);
		}
		let data ={};
		for(let course of assessments.courses) {
			let courseKey = course.subj + ' ' + course.numb + ' ' + course.title;
			data[courseKey] = {
				subj: course.subj,
				numb: course.numb,
				title: course.title,
				projects: {},
				students: []
			};
			for(let project of course.projects) {
				if(!project.active) {
					continue;
				}
				data[courseKey].projects[project.key] = {
					title: project.title,
					topics: {}
				};
				for(let topic of project.topics) {
					data[courseKey].projects[project.key].topics[topic.key] = {
						title: topic.title,
						students: []
					};
				}
			}
			for(let student of course.students) {
				for(let mapItem of student.map) {
					let temp = {
						name: student.name,
						email: student.email
					};
					data[courseKey].projects[mapItem.project].topics[mapItem.topic].students.push(temp);
					data[courseKey].students.push(temp);
				}
			}
		}
  		res.render('index', {data: data});
	});
});

module.exports = router;
