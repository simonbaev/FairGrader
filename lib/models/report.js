var mongoose = require('mongoose');

reportSchema = mongoose.Schema({
   term: String,
   course: {
   	title: String,
   	key: {
   		type: String,
   		required: true
   	}
   },
   project: {
   	title: String,
   	key: {
   		type: String,
   		required: true
   	}
   },
   topic: {
   	title: String,
   	key: {
   		type: String,
   		required: true
   	}
   },
   email: String,
   facultyAccess: {
   	type: [String],
   	required: true
   },
   contributor: {
   	email: String,
		score: Number,
		comment: String,
   },
});

module.exports = mongoose.model('Report', reportSchema);