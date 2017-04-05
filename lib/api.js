/* jshint esnext: true */

const Student = require('./models/student');
const restler = require('restler');

function getStudentName(student) {
	return student.firstName + ' ' + student.lastName;
}

exports.setup = function(io) {
	io.on('connect', function(socket){
		console.log('API connected from',socket.id);
		socket.on('emailToName', function(email,cb){
			Student.findOne({email:email},function(err,student){
				if(err) {
					return cb(err);
				}
				if(student) {
					cb(null, getStudentName(student));
				}
				else {
					console.log('INFO: student with email \'' + email + '\' not found in database');
					let query = email.split(/[@]/)[0].slice(1).replace(/\d/g,'');
					restler.get('https://apps.gsw.edu/search/student/searchxml.php?query=' + query, {
						parser: restler.parsers.xml
					})
					.on('complete', function (result) {
						if(result instanceof Error) {
							cb(result);
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
								return entry.email === email;
							});
							if(temp.length) {
								cb(null, getStudentName(temp[0]));
							}
							else {
								cb(new Error('Cannot find student with email \'' + email + '\' in directory'));
							}
						}
					});
				}
			});
		});
	});
};

