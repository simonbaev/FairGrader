/* jshint esnext: true */

var Project = require('../models/project');

exports.setup = function(next) {
	Project.remove({},function(err){
		if(err) {
			return next(err);
		}
		const projectData = [
			{
				active: true,
				term: '201702',
				course: {
					code: 'CSCI_6220',
					title: 'Distributed Operating Systems',
				},
				project: {
					key: 'Research',
					title: 'Research Presentation',
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
				topics: [],
				students: []
			},
			{
				active: true,
				term: '201702',
				course: {
					code: 'CSCI_4940',
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
						name: "Baev, Simon S.",
						email: "simon.baev@gsw.edu"
					},
					{
						name: "Anderson, Alejandra R.",
						email: "aander12@radar.gsw.edu",
						topicKey: "G3",
					},
					{
						name: "Anderson, Ryan A.",
						email: "randers6@radar.gsw.edu",
						topicKey: "G3",
					},
					{
						name: "Brown, Benjamin M.",
						email: "bbrown40@radar.gsw.edu",
						topicKey: "G1",
					},
					{
						name: "Deal, Jonathan D.",
						email: "jdeal1@radar.gsw.edu",
						topicKey: "G4",
					},
					{
						name: "Exum, Haley E.",
						email: "hexum@radar.gsw.edu",
						topicKey: "G3",
					},
					{
						name: "Helms, Madison K.",
						email: "mhelms3@radar.gsw.edu",
						topicKey: "G4",
					},
					{
						name: "Hobbs, Jonathan R.",
						email: "jhobbs2@radar.gsw.edu",
						topicKey: "G8",
					},
					{
						name: "Hubbard, Wordie R.",
						email: "whubbar1@radar.gsw.edu",
						topicKey: "G6",
					},
					{
						name: "Jordan, Sabrina R.",
						email: "sjones59@radar.gsw.edu",
						topicKey: "G3",
					},
					{
						name: "Kelly, Jason T.",
						email: "jkelly11@radar.gsw.edu",
						topicKey: "G2",
					},
					{
						name: "Landers, Curtis J.",
						email: "clander1@radar.gsw.edu",
						topicKey: "G4",
					},
					{
						name: "Martinez, Oscar R.",
						email: "omartine@radar.gsw.edu",
						topicKey: "G6",
					},
					{
						name: "Redmond, Chase T.",
						email: "credmon1@radar.gsw.edu",
						topicKey: "G7",
					},
					{
						name: "Reed, Leonard L.",
						email: "lreed1@radar.gsw.edu",
						topicKey: "G1",
					},
					{
						name: "Robinson, Dashumon R.",
						email: "drobins6@radar.gsw.edu",
						topicKey: "G5",
					},
					{
						name: "Sloan, Parker G.",
						email: "psloan@radar.gsw.edu",
						topicKey: "G3",
					},
					{
						name: "Stewart, Braxston C.",
						email: "bstewar3@radar.gsw.edu",
						topicKey: "G5",
					},
					{
						name: "Swan, Thomas C.",
						email: "tswan@radar.gsw.edu",
						topicKey: "G5",
					},
					{
						name: "Trinh, Joseph N.",
						email: "jtrinh@radar.gsw.edu",
						topicKey: "G4",
					},
					{
						name: "Tripi, Vincent J.",
						email: "vtripi@radar.gsw.edu",
						topicKey: "G1",
					}
				]
			}
		]
		.forEach(function(entry,index,array){
			new Project(entry).save(function(err, entry){
				if (err) {
					return next(err);
				}
				if(index == (array.length-1)) {
					next(null, array);
				}
			});
		});
	});
};