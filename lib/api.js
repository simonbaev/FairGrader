/* jshint esnext: true */

const Student = require('./models/student');
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
	});
};

