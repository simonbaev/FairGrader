/* jshint esnext: true */

let socket = io('/eval');

socket
.on('connect',function(){
	console.log('Data socket successfully connected');
})
.on('reconnect_error', function(err){
	console.log(err.message);
});

$(document).ready(function(){
	let temp = document.querySelector('#project-coordinates').dataset;
	socket.emit('getProjectDetails', temp, function(err, data){
		console.log(data);
	});
});