/* jshint esnext: true */

let socket = io('/eval');
socket
.on('connect',function(){
	console.log('Data socket successfully connected to', socket.id);
});

$(document).ready(function(){
	console.log('OK');
});