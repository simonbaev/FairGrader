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
   facultyEmail: String,
   contributor: {
   	email: String,
		score: Number,
   },
   //contribution: mongoose.Schema.ObjectId
});

module.exports = mongoose.model('Report', reportSchema);