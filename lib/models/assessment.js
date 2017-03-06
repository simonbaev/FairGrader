var mongoose = require('mongoose');

assessmentSchema = mongoose.Schema({
	year: Number,
	term: String,
	code: Number,
	courses: [{
		subj: String,
		numb: Number,
		title: String,
		projects: [{
			active: {
				type: Boolean,
				default: false
			},
			key: String,
			title: String,
			topics: [{
				key: String,
				title: String
			}]
		}],
		students: [{
			name: String,
			email: String,
			map: [{
				project: String,
				topic: String
			}]
		}]
	}]
});

module.exports = mongoose.model('Assessment', assessmentSchema);