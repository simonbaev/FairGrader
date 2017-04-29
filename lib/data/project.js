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
			term: '201702',
			course: {
				key: 'CSCI_4940',
				title: 'Capstone Project'
			},
			facultyAccess: [
				'boris.peltsverger@gsw.edu',
				'simon.baev@gsw.edu'
			],
			project: {
				key: 'test',
				title: 'Evaluation tester',
				criteria: [
					{
						title: 'Presentation',
						weight: 1
					},
					{
						title: 'Progress',
						weight: 3
					},
					{
						title: 'This is just a long description of a grading rubric',
						weight: 4
					},
				]
			},
			topics: [
				{
					key: 'T1',
					title: 'The first topic'
				},
				{
					key: 'T2',
					title: 'The second topic'
				}
			],
			students: [
				{
					email: 's1@radar.gsw.edu',
					topicKey: 'T1'
				},
				{
					email: 's2@radar.gsw.edu',
					topicKey: 'T1'
				},
				{
					email: 's3@radar.gsw.edu',
					topicKey: 'T2'
				},
			]
		},
		{
			active: true,
			term: '201702',
			course: {
				key: 'CSCI_6220',
				title: 'Distributed Operating Systems',
			},
			facultyAccess: [
				'simon.baev@gsw.edu'
			],
			project: {
				key: 'Research',
				title: 'Research Presentation',
				classification: 'presentation',
				criteria: [
					{
						title: 'Research comprehensiveness',
						weight: 2
					},
					{
						title: 'Technical details and their presentation',
						weight: 1
					},
					{
						title: 'Presentation quality (performance)',
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
					title: "Web sockets vs traditional socket programming: pros and cons",
				},
				{
					key: "P9",
					title: "Distributed lock manager"
				},
				{
					key: "P10",
					title: "Undeclared (Michael Powell)"
				},
				{
					key: "P11",
					title: "Undeclared (Adam Thoseby)"
				}
			],
			students: [
				{
					email: "kfan@radar.gsw.edu",
					topicKey: "P8"
				},
				{
					email: "agangji@radar.gsw.edu",
					topicKey: "P9"
				},
				{
					email: "hhong@radar.gsw.edu",
					topicKey: "P5"
				},
				{
					email: "bmarsha4@radar.gsw.edu",
					topicKey: "P6"
				},
				{
					email: "mpowel15@radar.gsw.edu",
					topicKey: "P10"
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
					topicKey: "P11"
				},
			]
		},
		{
			active: false,
			term: '201702',
			course: {
				key: 'CSCI_4940',
				title: 'Capstone Project'
			},
			facultyAccess: [
				'simon.baev@gsw.edu'
			],
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
		},
		{
			active: true,
			term: '201702',
			course: {
				key: 'CSCI_4940',
				title: 'Capstone Project'
			},
			facultyAccess: [
				'simon.baev@gsw.edu'
			],
			project: {
				key: 'FT',
				title: 'Final Presentation',
				classification: 'presentation',
				criteria: [
					{
						title: 'Scope of work of the particular team member (presenter) was clearly defined by that member during his/her part of the presentation',
						weight: 10
					},
					{
						title: 'Presenter clearly explained personal contribution to the overall project progress',
						weight: 20
					},
					{
						title: 'Presenter appeared as the one who actually performed his/her part of the work with respect to defined scope',
						weight: 40
					},
					{
						title: 'Overall completion of the project appears reasonable (this rubric is a reflection of the teamwork to each individual team member)',
						weight: 30
					}
				]
			},
			topics: [
				{
					key: "G1",
					title: "Interactive LED board (Team 1)"
				},
				{
					key: "G2",
					title: "Interactive LED board (Team 2)"
				},
				{
					key: "G3",
					title: "GSW All-in-one search"
				},
				{
					key: "G4",
					title: "Delphi project"
				},
				{
					key: "G5",
					title: "Business consultation website"
				},
				{
					key: "G6",
					title: "2D Side-Scroll Platformer"
				},
				{
					key: "G7",
					title: "GSW Math Tournment Grading, Sorting, and Reporting software"
				},
				{
					key: "G8",
					title: "Classroom recording project"
				}
			],
			students: [
				{
					email: "aander12@radar.gsw.edu",
					topicKey: "G1",
				},
				{
					email: "randers6@radar.gsw.edu",
					topicKey: "G1",
				},
				{
					email: "bbrown40@radar.gsw.edu",
					topicKey: "G2",
				},
				{
					email: "jdeal1@radar.gsw.edu",
					topicKey: "G4",
				},
				{
					email: "hexum@radar.gsw.edu",
					topicKey: "G1",
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
					topicKey: "G1",
				},
				{
					email: "jkelly11@radar.gsw.edu",
					topicKey: "G3",
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
					topicKey: "G2",
				},
				{
					email: "drobins6@radar.gsw.edu",
					topicKey: "G5",
				},
				{
					email: "psloan@radar.gsw.edu",
					topicKey: "G1",
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
					topicKey: "G2",
				}
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