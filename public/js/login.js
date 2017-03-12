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
	if(this.validity.valueMissing || this.validity.typeMismatch || !/[@](radar[.])?gsw[.]edu$/.test(this.value)) {
		$('#restore')
		.attr({
			'title': 'Make sure to type in correct official GSW e-mail',
			'disabled': ''
		});
	}
	else {
		$('#restore')
		.attr('title','')
		.removeAttr('disabled');
	}
})
.trigger('keyup');

$('#restore').click(function(){
	let email = $('.form-panel input[name=email]').val().trim();
	bootbox.confirm({
		title: 'Please confirm...',
		message: 'An e-mail with password recovery link will be sent to <b>' + email + '</b> email address. Would you like to proceed?',
		callback: function(result){
			if(result) {
				$.post('/restore',
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

