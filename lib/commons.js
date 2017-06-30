/* jshint esnext: true */

const User = require('../lib/models/user');
const Student = require('../lib/models/student');

exports.emailToName = function(cb) {
	let email = this;
	let emailToUserName = function(prefix){
		console.log(email);
		User.findOne({email:email}).select('name').lean().exec(function(err,user){
			if(!err && user && user.name) {
				return cb(null,{
					email: email,
					name: user.name
				});
			}
			if(!user) {
				return cb(null,{
					email: email,
					name: prefix + ' (' + email + ')'
				});
			}
			cb(null, {
				email: email,
				name: (user.faculty ? 'Faculty' : 'Student') + ' (' + email + ')'
			});
		});
	};
	if(!/[@]gsw[.]edu$/.test(email)) {
		//-- Student
		Student.findOne({email:email}).lean().exec(function(err,student){
			if(!err && student && student.firstName && student.lastName) {
				return cb(null, {
					email: email,
					name: student.firstName + ' ' + student.lastName
				});
			}
			emailToUserName('Student');
		});
	}
	else {
		emailToUserName('Faculty');
	}
};