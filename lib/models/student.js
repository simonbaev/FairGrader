/* jshint esnext: true */
const mongoose = require('mongoose');
const restler = require('restler');

studentSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		required: true
	}
})
.pre('save', function(next){
	let email = this.email;
	let self = this;
	this.constructor.findOne({email:email}, function(err,student){
		if(err) {
			return next(err);
		}
		if(!student || !student.firstName || !student.lastName) {
			let query = email.split(/[@]/)[0].slice(1).replace(/\d/g,'');
			restler.get('https://apps.gsw.edu/search/student/searchxml.php?query=' + query, {
				parser: restler.parsers.xml
			})
			.on('complete', function (result) {
				if(result instanceof Error) {
					next(result);
				}
				else {
					let temp = result.root.result.map(function(entry){
						return {
							lastName: entry.lname[0],
							firstName: entry.fname[0],
							email: entry.email[0]
						};
					})
					.filter(function(entry){
						return (entry.email === email);
					});
					if(temp.length) {
						self.lastName = temp[0].lastName;
						self.firstName = temp[0].firstName;
					}
					else {
						self.lastName = self.firstName = null;
						console.error('Cannot find a student with', email, 'e-mail in the online directory');
					}
					next();
				}
			});
		}
	});
})
.index({
	email: 1
});

module.exports = mongoose.model('Student', studentSchema);