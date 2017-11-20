/* jshint esnext: true */
var mongoose = require('mongoose');

projectSchema = mongoose.Schema({
	//-- Status
	active: {
		type: Boolean,
		default: false
	},
	//-- Creation timestamp
	createdAt: {
		type: Date,
		default: Date.now
	},
	//-- Emails of faculty who can access evaluation and report pages for this project
	facultyAccess: {
		required: true,
		type: [String],
	},
	//-- Term code in 6 digit (Banner) notation, e.g. 201705 for Spring 2017
	term: {
		required: true,
		type: String,
		match: /^20[12]\d0[258]$/
	},
	//-- Course, e.g. {code: 'CSCI_4940', title: 'Capstone Project'}
	course: {
		key: {
			type: String,
			match: /^[a-zA-Z]{2,5}_\d{2,5}$/,
			required: true,
			uppercase: true
		},
		title: String,
		dept: {
			type: String,
			default: 'Computer Science'
		}
	},
	//-- Project details
	project: {
		//-- Something short like 'MT'
		key: {
			required: true,
			type: String
		},
		//-- Full project name like 'Midterm Presentation'
		title: String,
		classification: {
			type: String,
			enum: ['presentation', 'peer-evaluation'],
			default: 'presentation'
		},
		criteria: [{
			title: String,
			key: String,
			weight: Number
		}]
	},
	//-- Project topics
	topics: [{
		key: {
			required: true,
			type: String
		},
		title: String,
		students: [String]
	}],
	//-- Students assigned to work on this project
	students: [{
		email: String,
		topicKey: String
	}]
})
.pre('save', function(next) {
	//-- Normalize criteria weights
	let sum = 0;
	let index = 1;
	for(let criterium of this.project.criteria) {
		sum += criterium.weight;
		if(!criterium.key) {
			criterium.key = 'C' + (index++);
		}
	}
	this.project.criteria = this.project.criteria.map(function(criterium){
		criterium.weight /= sum;
		return criterium;
	});
	next();
})
.pre('save', function(next){
	//-- Sort students into topics
	let filterStudents = function(entry) {
		return entry.topicKey === this.key;
	};
	let mapStudents = function(entry) {
		return entry.email;
	};
	for(let topic of this.topics) {
		topic.students = this.students.filter(filterStudents, topic).map(mapStudents);
	}
	next();
});

module.exports = mongoose.model('Project', projectSchema);