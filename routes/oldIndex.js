/* jshint esnext: true */
var express = require('express');
var Assessment = require('../lib/models/assessment');
var Contribution = require('../lib/models/contribution');
var EmailTemplate = require('email-templates').EmailTemplate;
var mailer = require('../lib/mailer');
var path = require('path');
var router = express.Router();
const requestIp = require('request-ip');

router.post('/', function(req, res, next) {
	//-- Regroup form data
	let data = {
		course: req.body.course,
		project: req.body.project,
		title: req.body.title,
		name: req.body.name,
		email: req.body.email,
		topic: req.body.topic,
		overall: parseInt(req.body.overall),
		members: []
	};
	if(typeof req.body['member-name'] === 'string') {
		data.members.push({
			name: req.body['member-name'],
			email: req.body['member-email'],
			progress: parseInt(req.body.progress),
			presentation: parseInt(req.body.presentation)
		});
	}
	else {
		for(let i=0; i<req.body.progress.length; i++) {
			data.members.push({
				name: req.body['member-name'][i],
				email: req.body['member-email'][i],
				progress: parseInt(req.body.progress[i]),
				presentation: parseInt(req.body.presentation[i])
			});
		}
	}
	//-- Save data into DB
	res.setHeader('Content-Type', 'application/json');
	new Contribution(data).save(function(err, contribution) {
		if(err) {
			return next(err);
		}
		setTimeout(function(){
				contribution.expired = true;
				contribution.save(function(err, contribution){
					console.error('Contribution \'' + contribution._id + '\' has been expired');
				});
			},
			1000 * 60 * 60 * 24
		);
		//-- Send confirmation e-mail
		var port = req.app.settings.port;
		var host = req.protocol + '://' + req.hostname  + ':' + port;
		console.log(JSON.stringify(contribution,null,3));
		new EmailTemplate(path.join(__dirname,'..','templates','contributionReceived')).render(
			{
				contribution: {
					id: contribution._id,
					name: contribution.name.split(/\s/)[1],
					project: contribution.title,
					course: contribution.course
				},
				host: host
			},
			function(err,result){
				if(err) {
					res.send({
						status: 1,
						message: 'Cannot generate notification e-mail'
					});
					return;
				}
				mailer.transporter.sendMail(
					{
						from: 'FairGrader Mailing Robot <noreply@fg.gswcm.net>',
						to: contribution.email,
						subject: 'Please confirm your FairGrader contribution',
						html: result.html,
						text: result.text
					},
					function(err,info){
						if(err) {
							res.send({
								status: 2,
								message: err.message
							});
							return;
						}
						//-- Success
						res.send({
							status: 0,
							message: 'OK'
						});
					}
				);
			}
		);
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
				let temp = {
					name: student.name,
					email: student.email
				};
				for(let mapItem of student.map) {
					data[courseKey].projects[mapItem.project].topics[mapItem.topic].students.push(temp);
				}
				data[courseKey].students.push(temp);
			}
		}
  		res.render('oldIndex', {
  			data: data,
  			session: req.session,
  		});
	});
});

module.exports = router;
