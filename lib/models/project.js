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
		code: String,
		title: String
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
	},
	//-- Project topics
	topics: [{
		key: {
			required: true,
			type: String
		},
		title: String
	}],
	//-- Students assigned to work on this project
	students: [{
		name: String,
		email: String,
		topicKey: String
	}]
});

module.exports = mongoose.model('Project', projectSchema);