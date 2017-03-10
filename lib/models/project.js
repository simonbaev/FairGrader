/* jshint esnext: true */
var mongoose = require('mongoose');

projectSchema = mongoose.Schema({
	//-- Status
	active: {
		type: Boolean,
		default: false
	},
	//-- Term code in 6 digit (Banner) notation, e.g. 201705 for Spring 2017
	term: {
		required: true,
		type: String
	},
	//-- Course, e.g. {code: 'CSCI_4940', title: 'Capstone Project'}
	course: {
		code: {
			type: String,
			match: /^[a-zA-Z]{2,5}_\d{2,5}$/,
			required: true
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
		students: [{
			name: String,
			email: String
		}]
	}],
	//-- Students assigned to work on this project
	students: [{
		name: String,
		email: String,
		topicKey: String
	}]
})
.pre('save', function(next) {
	//-- Normalize criteria weights
	let sum = 0;
	for(let criterium of this.project.criteria) {
		sum += criterium.weight;
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
		return {
			name: entry.name,
			email: entry.email
		};
	};
	for(let topic of this.topics) {
		topic.students = this.students.filter(filterStudents, topic).map(mapStudents);
	}
	next();
});

module.exports = mongoose.model('Project', projectSchema);