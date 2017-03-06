/* jshint esnext: true */
var mongoose = require('mongoose');

contributionSchema = mongoose.Schema({

   course: String,
   project: String,
   email: String,
   name: String,
   topic: String,
   overall: Number,
   expired: {
   	type: Boolean,
   	default: false
   },
   members: [{
   	name: String,
   	email: String,
   	progress: Number,
   	presentation: Number

   }]
});

module.exports = mongoose.model('Contribution', contributionSchema);