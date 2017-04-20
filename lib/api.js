/* jshint esnext: true */

const Student = require('./models/student');
const User = require('./models/user');
const restler = require('restler');

function getStudentName(student) {
	return student.firstName + ' ' + student.lastName;
}

exports.setup = function(io) {
	io.on('connect', function(socket){
		console.log('API connected from',socket.id);
		socket.on('getStudentByEmail', function(email,cb){
			Student.findOne({email:email}, cb);
		});
		socket.on('getUserByEmail', function(email,cb){
			User.findOne({email:email}).lean().exec(function(err, user) {
				if(err || !user) {
					return cb({
						status: 1,
					});
				}
				cb({
					status: 0,
					name: user.name ? user.name : (user.faculty ? 'Faculty' : 'Student') + ' (' + user.email + ')'
				});
			});
		});
	});
};

