/* jshint esnext: true */

const Project = require('../models/project');
const Student = require('../models/student');
const async = require('async');

exports.setup = function(next) {
	console.log('Adding projects and resolving students\' emails from online directory...');
	let fnProjectArray = [], studentsArray = [];
	const projectData = [
		{
			active: true,
			term: '201705',
			course: {
				key: 'CIS_4200',
				title: 'Computer Security'
			},
			facultyAccess: [
				'boris.peltsverger@gsw.edu',
				'simon.baev@gsw.edu'
			],
			project: {
				key: 'Research',
				title: 'Research Presentation',
				criteria: [
					{
						title: 'Presenter clearly defined his/her scope of research',
						weight: 25
					},
					{
						title: 'Presenter introduced the problem, walked through the theoretical background, and (optionally) illustrated the problem on live experiment',
						weight: 40
					},
					{
						title: 'Presenter\'s performance and slides\' quality',
						weight: 35
					}
				]
			},
			topics: [
				{
					key: 'R1',
					title: 'Backend data storage solutions'
				},
				{
					key: 'R2',
					title: 'Stored XSS'
				},
				{
					key: 'R3',
					title: 'Stack overflow'
				},
				{
					key: 'R4',
					title: 'Reflected XSS'
				},
				{
					key: 'R5',
					title: 'SQL injection XSS'
				},
			],
			students: [
				{
					email: 'bbazemo2@radar.gsw.edu',
					topicKey: 'R5'
				},
				{
					email: 'abittle@radar.gsw.edu',
					topicKey: 'R3',
				},
				{
					email: 'cclemen3@radar.gsw.edu',
					topicKey: 'R1',
				},
				{
					email: 'ccrawfo4@radar.gsw.edu',
					topicKey: 'R5',
				},
				{
					email: 'hexum@radar.gsw.edu',
					topicKey: 'R4',
				},
				{
					email: 'omartine@radar.gsw.edu',
					topicKey: 'R1',
				},
				{
					email: 'mperry11@radar.gsw.edu',
					topicKey: 'R4',
				},
				{
					email: 'tpittma1@radar.gsw.edu',
					topicKey: 'R1',
				},
				{
					email: 'lreed1@radar.gsw.edu',
					topicKey: 'R2',
				},
				{
					email: 'hrobins3@radar.gsw.edu',
					topicKey: 'R5',
				},
				{
					email: 'bstewar3@radar.gsw.edu',
					topicKey: 'R2',
				},
				{
					email: 'tswan@radar.gsw.edu',
					topicKey: 'R2',
				},
				{
					email: 'jtrinh@radar.gsw.edu',
					topicKey: 'R4',
				},
				{
					email: 'twashbur@radar.gsw.edu',
					topicKey: 'R3',
				},
				{
					email: 'asolomo3@radar.gsw.edu',
					topicKey: 'R3',
				},
			]
		}
	];
	projectData.forEach(function(projectItem){
		let temp = new Project(projectItem);
		fnProjectArray.push(temp.save.bind(temp));
		projectItem.students.forEach(function(studentItem){
			if(studentsArray.indexOf(studentItem.email) === -1) {
				studentsArray.push(studentItem.email);
			}
		});
	});
	async.series(fnProjectArray,function(err, projects){
		if(err) {
			return next(err);
		}
		async.parallel(
			studentsArray.map(function(email){
				let temp = new Student({email:email});
				return temp.save.bind(temp);
			}),
			function(err, students){
				next(null, 'Projects (' + projects.length + '); Students (' + students.length + ')');
			}
		);
	});
};