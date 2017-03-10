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

