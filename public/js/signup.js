/* jshint esnext: true */

$('.form-panel form').submit(function(){
	let form = $(this);
	$.post(
		form.attr('action'),
		form.serialize(),
		function(json){
			if(json.status !== 0) {
				showMessage($('.message-panel span'),'text-danger', json.message, 5000);
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

$('.link-panel button').click(function(){
	window.location.replace('/login');
});

$('.form-panel form input[name=email]').keyup(function(){
	let errorMessage = '';
	if(this.validity.valueMissing || this.validity.typeMismatch || !/[@](radar[.])?gsw[.]edu$/.test(this.value)) {
		errorMessage = 'Not an official GSW e-mail';
	}
	this.setCustomValidity(errorMessage);
	this.title = errorMessage;
});

