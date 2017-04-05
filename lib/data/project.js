/* jshint esnext: true */

const Project = require('../models/project');
const Student = require('../models/student');
const async = require('async');

exports.setup = function(next) {
	console.log('Adding projects and resolving students\' emails from online directory...');
	let fnProjectArray = [], fnStudentArray = [];
	const projectData = [
		{
			active: true,
			term: '201702',
			course: {
				key: 'CSCI_6220',
				title: 'Distributed Operating Systems',
			},
			project: {
				key: 'Research',
				title: 'Research Presentation',
				classification: 'presentation',
				criteria: [
					{
						title: 'Results',
						weight: 1
					},
					{
						title: 'Technical details',
						weight: 1
					},
					{
						title: 'Presentation',
						weight: 1
					}
				]
			},
			topics: [
				{
					key: "P1",
					title: "Time synchronization problem in distributed computing",
				},
				{
					key: "P2",
					title: "Workload distribution algorithms from data coherency perspective",
				},
				{
					key: "P3",
					title: "Network load balancing in distributed systems",
				},
				{
					key: "P4",
					title: "Reliability of server-less distributed systems",
				},
				{
					key: "P5",
					title: "Comparison of popular bootstrapping (start-up) protocols in P2P network applications",
				},
				{
					key: "P6",
					title: "Personal file sharing based on enterprise-free (no centralized management) solutions"
				},
				{
					key: "P7",
					title: "Comparison of programming platforms (languages, libraries, paradigms, protocols, etc) currently used for distributed computing",
				},
				{
					key: "P8",
					title: "Web sockets vs traditional socket programming: pros and cons. ",
				},
				{
					key: "Px",
					title: "Undeclared"
				}
			],
			students: [
				{
					email: "kfan@radar.gsw.edu",
					topicKey: "P8"
				},
				{
					email: "agangji@radar.gsw.edu",
					topicKey: "Px"
				},
				{
					email: "hhong@radar.gsw.edu",
					topicKey: "P5"
				},
				{
					email: "bmarsha4@radar.gsw.edu",
					topicKey: "Px"
				},
				{
					email: "mpowel15@radar.gsw.edu",
					topicKey: "Px"
				},
				{
					email: "kreddiva@radar.gsw.edu",
					topicKey: "P7"
				},
				{
					email: "ashah1@radar.gsw.edu",
					topicKey: "P1"
				},
				{
					email: "psingh@radar.gsw.edu",
					topicKey: "P4"
				},
				{
					email: "rsmith36@radar.gsw.edu",
					topicKey: "P3"
				},
				{
					email: "athoseby@radar.gsw.edu",
					topicKey: "Px"
				},
			]
		},
		{
			active: true,
			term: '201702',
			course: {
				key: 'CSCI_4940',
				title: 'Capstone Project'
			},
			project: {
				key: 'MT',
				title: 'Midterm Presentation',
				classification: 'presentation',
				criteria: [
					{
						title: 'Progress',
						weight: 1
					},
					{
						title: 'Presentation',
						weight: 1
					}
				]
			},
			topics: [
				{
					key: "G1",
					title: "Interactive LED board (Team 2)"
				},
				{
					key: "G2",
					title: "All-in-one GSW search"
				},
				{
					key: "G3",
					title: "Interactive LED board (Team 1)"
				},
				{
					key: "G4",
					title: "Delphi project"
				},
				{
					key: "G5",
					title: "Business consultant website"
				},
				{
					key: "G6",
					title: "Unity 2D Project"
				},
				{
					key: "G7",
					title: "GSW Math Tournament Registration, Grading, and Reporting Solution"
				},
				{
					key: "G8",
					title: "Lecture capture solution"
				}
			],
			students: [
				{
					email: "aander12@radar.gsw.edu",
					topicKey: "G3",
				},
				{
					email: "randers6@radar.gsw.edu",
					topicKey: "G3",
				},
				{
					email: "bbrown40@radar.gsw.edu",
					topicKey: "G1",
				},
				{
					email: "jdeal1@radar.gsw.edu",
					topicKey: "G4",
				},
				{
					email: "hexum@radar.gsw.edu",
					topicKey: "G3",
				},
				{
					email: "mhelms3@radar.gsw.edu",
					topicKey: "G4",
				},
				{
					email: "jhobbs2@radar.gsw.edu",
					topicKey: "G8",
				},
				{
					email: "whubbar1@radar.gsw.edu",
					topicKey: "G6",
				},
				{
					email: "sjones59@radar.gsw.edu",
					topicKey: "G3",
				},
				{
					email: "jkelly11@radar.gsw.edu",
					topicKey: "G2",
				},
				{
					email: "clander1@radar.gsw.edu",
					topicKey: "G4",
				},
				{
					email: "omartine@radar.gsw.edu",
					topicKey: "G6",
				},
				{
					email: "credmon1@radar.gsw.edu",
					topicKey: "G7",
				},
				{
					email: "lreed1@radar.gsw.edu",
					topicKey: "G1",
				},
				{
					email: "drobins6@radar.gsw.edu",
					topicKey: "G5",
				},
				{
					email: "psloan@radar.gsw.edu",
					topicKey: "G3",
				},
				{
					email: "bstewar3@radar.gsw.edu",
					topicKey: "G5",
				},
				{
					email: "tswan@radar.gsw.edu",
					topicKey: "G5",
				},
				{
					email: "jtrinh@radar.gsw.edu",
					topicKey: "G4",
				},
				{
					email: "vtripi@radar.gsw.edu",
					topicKey: "G1",
				}
			]
		}
	];
	projectData.forEach(function(projectItem){
		let temp = new Project(projectItem);
		fnProjectArray.push(temp.save.bind(temp));
		projectItem.students.forEach(function(studentItem){
			let temp = new Student({email:studentItem.email});
			fnStudentArray.push(temp.save.bind(temp));
		});
	});
	async.series(fnProjectArray,function(err, projects){
		if(err) {
			return next(err);
		}
		async.parallel(fnStudentArray,function(err, students){
			next(null, 'Projects (' + projects.length + '); Students (' + students.length + ')');
		});
	});
};