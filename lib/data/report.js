/* jshint esnext: true */

const Report = require('../models/report');
const Project = require('../models/project');
const defaultTerm = '201702';


exports.setup = function(next) {
	Report.remove({},function(err){
		if(err) {
			console.log(1,err.message);
			return next(err);
		}
		Project.findOne({
			term: defaultTerm,
			'course.key': 'CSCI_4940',
			'project.key': 'MT'
		})
		.lean()
		.exec(function(err, projectItem){
			if(err) {
				console.log(2,err.message);
				return next(err);
			}
			if(!projectItem) {
				return next(new Error('Project cannot be found'));
			}
			const data = [
				{
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 90,
						"presentation": 90,
						// "comment": "What kind of programming language was that?"
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Exum, Haley E.",
					"email": "hexum@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 100,
						"presentation": 90,
						// "comment": "I have no clue what your project is all about"
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Jordan, Sabrina R.",
					"email": "sjones59@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Anderson, Alejandra R.",
					"email": "aander12@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 85,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Landers, Curtis J.",
					"email": "clander1@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Sloan, Parker G.",
					"email": "psloan@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 80,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Deal, Jonathan D.",
					"email": "jdeal1@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Stewart, Braxston C.",
					"email": "bstewar3@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Martinez, Oscar R.",
					"email": "omartine@radar.gsw.edu",
					"topic": "G7",
					"overall": 90,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 90,
						"presentation": 79
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Kelly, Jason T.",
					"email": "jkelly11@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 91,
						"presentation": 89
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Helms, Madison K.",
					"email": "mhelms3@radar.gsw.edu",
					"topic": "G7",
					"overall": 92,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 90,
						"presentation": 87
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Trinh, Joseph N.",
					"email": "jtrinh@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 92,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Exum, Haley E.",
					"email": "hexum@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 95,
						"presentation": 85
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 90,
						"presentation": 85
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Exum, Haley E.",
					"email": "hexum@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 95,
						"presentation": 85
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 90,
						"presentation": 85
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Anderson, Alejandra R.",
					"email": "aander12@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 80,
						"presentation": 88
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 72,
						"presentation": 72
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Kelly, Jason T.",
					"email": "jkelly11@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 80,
						"presentation": 80
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 80,
						"presentation": 80
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 80,
						"presentation": 85
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Redmond, Chase T.",
					"email": "credmon1@radar.gsw.edu",
					"topic": "G5",
					"overall": 75,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 75,
						"presentation": 70
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 75,
						"presentation": 65
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 75,
						"presentation": 80
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Sloan, Parker G.",
					"email": "psloan@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 80,
						"presentation": 100
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 80,
						"presentation": 100
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 85,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Helms, Madison K.",
					"email": "mhelms3@radar.gsw.edu",
					"topic": "G5",
					"overall": 95,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 93,
						"presentation": 87
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 93,
						"presentation": 85
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 93,
						"presentation": 96
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Deal, Jonathan D.",
					"email": "jdeal1@radar.gsw.edu",
					"topic": "G5",
					"overall": 85,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Trinh, Joseph N.",
					"email": "jtrinh@radar.gsw.edu",
					"topic": "G5",
					"overall": 98,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 92,
						"presentation": 100
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 92,
						"presentation": 96
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 92,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Stewart, Braxston C.",
					"email": "bstewar3@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Exum, Haley E.",
					"email": "hexum@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Robinson, Dashumon R.",
					"email": "drobins6@radar.gsw.edu",
					"topic": "G4",
					"overall": 97,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 96,
						"presentation": 100
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Robinson, Dashumon R.",
					"email": "drobins6@radar.gsw.edu",
					"topic": "G7",
					"overall": 97,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 97,
						"presentation": 98
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Sloan, Parker G.",
					"email": "psloan@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 88,
						"presentation": 90
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 85,
						"presentation": 92
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 88,
						"presentation": 95
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 90,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Anderson, Alejandra R.",
					"email": "aander12@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 88,
						"presentation": 92
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 90,
						"presentation": 96
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 88,
						"presentation": 95
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 90,
						"presentation": 98
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Kelly, Jason T.",
					"email": "jkelly11@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Redmond, Chase T.",
					"email": "credmon1@radar.gsw.edu",
					"topic": "G4",
					"overall": 95,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 80,
						"presentation": 90
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 80,
						"presentation": 90
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 85,
						"presentation": 90
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 100,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 90,
						"presentation": 95
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 90,
						"presentation": 95
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 90,
						"presentation": 95
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Stewart, Braxston C.",
					"email": "bstewar3@radar.gsw.edu",
					"topic": "G3",
					"overall": 100,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 84,
						"presentation": 94
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 84,
						"presentation": 94
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 84,
						"presentation": 94
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 84,
						"presentation": 94
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 84,
						"presentation": 94
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G3",
					"overall": 100,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 85,
						"presentation": 85
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 80,
						"presentation": 80
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 70,
						"presentation": 70
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G3",
					"overall": 100,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 85,
						"presentation": 87
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 85,
						"presentation": 81
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 75,
						"presentation": 75
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 75,
						"presentation": 75
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 85,
						"presentation": 85
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Deal, Jonathan D.",
					"email": "jdeal1@radar.gsw.edu",
					"topic": "G3",
					"overall": 85,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Trinh, Joseph N.",
					"email": "jtrinh@radar.gsw.edu",
					"topic": "G3",
					"overall": 100,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 100,
						"presentation": 96
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 100,
						"presentation": 96
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 100,
						"presentation": 96
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 100,
						"presentation": 96
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 100,
						"presentation": 96
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Helms, Madison K.",
					"email": "mhelms3@radar.gsw.edu",
					"topic": "G3",
					"overall": 100,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 95,
						"presentation": 93
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 95,
						"presentation": 92
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Kelly, Jason T.",
					"email": "jkelly11@radar.gsw.edu",
					"topic": "G3",
					"overall": 100,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 100,
						"presentation": 99
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Robinson, Dashumon R.",
					"email": "drobins6@radar.gsw.edu",
					"topic": "G3",
					"overall": 92,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 97,
						"presentation": 98
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 94,
						"presentation": 95
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 90,
						"presentation": 92
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 90,
						"presentation": 81
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 96,
						"presentation": 98
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Redmond, Chase T.",
					"email": "credmon1@radar.gsw.edu",
					"topic": "G3",
					"overall": 80,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 86,
						"presentation": 85
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 86,
						"presentation": 85
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 88,
						"presentation": 61
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 75,
						"presentation": 25
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 90,
						"presentation": 85
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Deal, Jonathan D.",
					"email": "jdeal1@radar.gsw.edu",
					"topic": "G5",
					"overall": 85,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Jordan, Sabrina R.",
					"email": "sjones59@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Exum, Haley E.",
					"email": "hexum@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Helms, Madison K.",
					"email": "mhelms3@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 100,
						"presentation": 95
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 100,
						"presentation": 97
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Trinh, Joseph N.",
					"email": "jtrinh@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 100,
						"presentation": 94
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 100,
						"presentation": 96
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Sloan, Parker G.",
					"email": "psloan@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 80,
						"presentation": 83
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 80,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Kelly, Jason T.",
					"email": "jkelly11@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Robinson, Dashumon R.",
					"email": "drobins6@radar.gsw.edu",
					"topic": "G6",
					"overall": 94,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 96,
						"presentation": 92
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 96,
						"presentation": 92
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Helms, Madison K.",
					"email": "mhelms3@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Trinh, Joseph N.",
					"email": "jtrinh@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 97,
						"presentation": 97
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Sloan, Parker G.",
					"email": "psloan@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 88,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Robinson, Dashumon R.",
					"email": "drobins6@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 98,
						"presentation": 98
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Stewart, Braxston C.",
					"email": "bstewar3@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 90,
						"presentation": 90
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Exum, Haley E.",
					"email": "hexum@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Kelly, Jason T.",
					"email": "jkelly11@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G8",
					"overall": 95,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 94,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Kelly, Jason T.",
					"email": "jkelly11@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Trinh, Joseph N.",
					"email": "jtrinh@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 96,
						"presentation": 95
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 98,
						"presentation": 95
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 100,
						"presentation": 97
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Helms, Madison K.",
					"email": "mhelms3@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 100,
						"presentation": 95
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 100,
						"presentation": 95
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 100,
						"presentation": 98
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Sloan, Parker G.",
					"email": "psloan@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 85,
						"presentation": 85
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 85,
						"presentation": 85
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 85,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Exum, Haley E.",
					"email": "hexum@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 95,
						"presentation": 50
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 95,
						"presentation": 50
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 95,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 80,
						"presentation": 80
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 80,
						"presentation": 80
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 80,
						"presentation": 90
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 70,
						"presentation": 70
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 70,
						"presentation": 70
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Stewart, Braxston C.",
					"email": "bstewar3@radar.gsw.edu",
					"topic": "G1",
					"overall": 100,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 84,
						"presentation": 80
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 84,
						"presentation": 80
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 91,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Robinson, Dashumon R.",
					"email": "drobins6@radar.gsw.edu",
					"topic": "G1",
					"overall": 88,
					"members": [{
						"name": "Brown, Benjamin M.",
						"email": "bbrown40@radar.gsw.edu",
						"progress": 80,
						"presentation": 80
					}, {
						"name": "Reed, Leonard L.",
						"email": "lreed1@radar.gsw.edu",
						"progress": 80,
						"presentation": 80
					}, {
						"name": "Tripi, Vincent J.",
						"email": "vtripi@radar.gsw.edu",
						"progress": 96,
						"presentation": 97
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Hubbard, Wordie R.",
					"email": "whubbar1@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 95,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Sloan, Parker G.",
					"email": "psloan@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 85,
						"presentation": 95
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Robinson, Dashumon R.",
					"email": "drobins6@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 98,
						"presentation": 98
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Swan, Thomas C.",
					"email": "tswan@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Trinh, Joseph N.",
					"email": "jtrinh@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Helms, Madison K.",
					"email": "mhelms3@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Stewart, Braxston C.",
					"email": "bstewar3@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 93,
						"presentation": 90
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Tripi, Vincent J.",
					"email": "vtripi@radar.gsw.edu",
					"topic": "G3",
					"overall": 90,
					"members": [{
						"name": "Anderson, Alejandra R.",
						"email": "aander12@radar.gsw.edu",
						"progress": 65,
						"presentation": 80
					}, {
						"name": "Anderson, Ryan A.",
						"email": "randers6@radar.gsw.edu",
						"progress": 100,
						"presentation": 90
					}, {
						"name": "Exum, Haley E.",
						"email": "hexum@radar.gsw.edu",
						"progress": 65,
						"presentation": 70
					}, {
						"name": "Jordan, Sabrina R.",
						"email": "sjones59@radar.gsw.edu",
						"progress": 65,
						"presentation": 70
					}, {
						"name": "Sloan, Parker G.",
						"email": "psloan@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Tripi, Vincent J.",
					"email": "vtripi@radar.gsw.edu",
					"topic": "G2",
					"overall": 100,
					"members": [{
						"name": "Kelly, Jason T.",
						"email": "jkelly11@radar.gsw.edu",
						"progress": 80,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Tripi, Vincent J.",
					"email": "vtripi@radar.gsw.edu",
					"topic": "G4",
					"overall": 100,
					"members": [{
						"name": "Deal, Jonathan D.",
						"email": "jdeal1@radar.gsw.edu",
						"progress": 85,
						"presentation": 100
					}, {
						"name": "Helms, Madison K.",
						"email": "mhelms3@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}, {
						"name": "Landers, Curtis J.",
						"email": "clander1@radar.gsw.edu",
						"progress": 85,
						"presentation": 100
					}, {
						"name": "Trinh, Joseph N.",
						"email": "jtrinh@radar.gsw.edu",
						"progress": 100,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Tripi, Vincent J.",
					"email": "vtripi@radar.gsw.edu",
					"topic": "G5",
					"overall": 100,
					"members": [{
						"name": "Robinson, Dashumon R.",
						"email": "drobins6@radar.gsw.edu",
						"progress": 70,
						"presentation": 80
					}, {
						"name": "Stewart, Braxston C.",
						"email": "bstewar3@radar.gsw.edu",
						"progress": 70,
						"presentation": 80
					}, {
						"name": "Swan, Thomas C.",
						"email": "tswan@radar.gsw.edu",
						"progress": 80,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Tripi, Vincent J.",
					"email": "vtripi@radar.gsw.edu",
					"topic": "G6",
					"overall": 100,
					"members": [{
						"name": "Hubbard, Wordie R.",
						"email": "whubbar1@radar.gsw.edu",
						"progress": 65,
						"presentation": 70
					}, {
						"name": "Martinez, Oscar R.",
						"email": "omartine@radar.gsw.edu",
						"progress": 90,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Tripi, Vincent J.",
					"email": "vtripi@radar.gsw.edu",
					"topic": "G7",
					"overall": 100,
					"members": [{
						"name": "Redmond, Chase T.",
						"email": "credmon1@radar.gsw.edu",
						"progress": 85,
						"presentation": 100
					}],
				}, {
					"course": "CSCI_4940",
					"project": "MT",
					"title": "Midterm Presentation",
					"name": "Tripi, Vincent J.",
					"email": "vtripi@radar.gsw.edu",
					"topic": "G8",
					"overall": 100,
					"members": [{
						"name": "Hobbs, Jonathan R.",
						"email": "jhobbs2@radar.gsw.edu",
						"progress": 85,
						"presentation": 100
					}],
				}
			]
			.forEach(function(entry, index, array) {
				entry.members.forEach(function(member){
					let report = {
						term: defaultTerm,
						course: {
							key: projectItem.course.key,
							title: projectItem.course.title
						},
						project: {
							key: projectItem.project.key,
							title: projectItem.project.title
						},
						topic: {
							key: entry.topic,
							title: projectItem.topics.filter(function(topic){
								return topic.key === entry.topic;
							})[0].title
						},
						email: member.email,
						facultyEmail: 'simon.baev@gsw.edu',
						contributor: {
							email: entry.email,
							score: entry.overall / 100 * (member.progress + member.presentation) / 2,
							comment: member.comment || null
						}
					};
					new Report(report).save(function(err,report){
						if(err) {
							return next(err);
						}
						if(index == (array.length - 1)) {
							return next(null, 'Reports (' + array.length + ')');
						}
					});
				});
			});
		});
	});
};

