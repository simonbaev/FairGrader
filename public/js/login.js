/* jshint esnext: true */
var formSubmitHandler = function(ev, doSubmit){
	if(doSubmit) {
		return true;
	}
	var form = $(this);
	$.post(form.attr('action'), form.serialize() + '&isCheck=true', function(json){
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
	window.location.replace('/signup');
});

$('.form-panel input[name=email]').keyup(function(){
	let errorMessage = '';
	if(this.validity.valueMissing || this.validity.typeMismatch || !/[@](radar[.])?gsw[.]edu$/.test(this.value)) {
		$('#restore').attr('disabled', '');
		errorMessage = 'Not an official GSW e-mail';
	}
	else {
		$('#restore').removeAttr('disabled');
	}
	$('#restore').attr('title',errorMessage);
	this.setCustomValidity(errorMessage);
	this.title = errorMessage;
})
.trigger('keyup');

$('#restore').click(function(){
	let email = $('.form-panel input[name=email]').val().trim();
	let postURL = this.dataset.url;
	bootbox.confirm({
		title: 'Please confirm...',
		message: 'An e-mail with password recovery link will be sent to <b>' + email + '</b> email address. Would you like to proceed?',
		callback: function(result){
			if(result) {
				$.post(postURL,
					{
						email: email
					},
					function(json) {
						showMessage($('.message-panel span'),json.status === 0 ? 'text-success' : 'text-danger', json.message, 5000);
					},
					'json'
				);
			}
		}
	});
	return false;
});

