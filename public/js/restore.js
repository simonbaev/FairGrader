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
