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
	if(this.validity.valueMissing || this.validity.typeMismatch) {
		$('#restore')
		.attr({
			'title': 'Make sure to type in correct e-mail',
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

	return false;
});

