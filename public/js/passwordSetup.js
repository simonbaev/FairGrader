/* jshint esnext: true */

$('.form-panel form').submit(function(){
	let form = $(this);
	$.post(
		form.attr('action'),
		form.serialize(),
		function(json){
			if(json.status !== 0) {
				showMessage($('.message-panel span'),'text-danger', json.message);
			}
			else {
				bootbox.alert(json.message, function(){
					window.location.replace('/login');
				});
			}
		},
		'json'
	);
	return false;
});
$('.form-panel form input[type=password]').keyup(function(){
	var errorMessage;
	if(this.id === "password") {
		$('#password-confirm').attr('pattern',$('#password').val());
	}
	if(this.validity.patternMismatch) {
		errorMessage =
			(this.id === "password") ?
			"Must contain at least 8 characters" :
			"Passwords must match";
	}
	else {
		errorMessage = "";
	}
	this.setCustomValidity(errorMessage);
	this.title = errorMessage;
});

$(document).ready(function(){
	//-- Get additional information
	$.get('/password',{token: $('[name=token]').val()},function(json){
		if(json.status === 0) {
			$('[name=name]').val(json.name);
		}
		else {
			showMessage($('.message-panel span'),'text-danger', json.message);
		}
	},'json');
});
