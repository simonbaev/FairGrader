/* jshint esnext: true */
var mongoose = require('mongoose');

contributionSchema = mongoose.Schema({

   course: String,
   term: String,
   project: String,
   title: String,
   email: String,
   name: String,
   topic: String,
   overall: Number,
   members: [{
   	name: String,
   	email: String,
   	progress: Number,
   	presentation: Number

   }]
});

module.exports = mongoose.model('Contribution', contributionSchema);