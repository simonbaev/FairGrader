var formSubmitHandler = function(ev, doSubmit){
	if(doSubmit) {
		return true;
	}
	var form = $(this);
	$.post(form.attr('action'),form.serialize() + '&isCheck=true', function(json){
		if(json.status !== 0) {
			showMessage($('.message-panel span'),'text-danger', json.message);
		}
		else {
			form.trigger('submit', true);
		}
	},'json');
	return false;
};
$('.form-panel form').submit(formSubmitHandler);
$('.link-panel button').click(function(){
	window.location.replace('/login');
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
