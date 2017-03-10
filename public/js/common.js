function showMessage(messagePanel, cls, message, delay, fn) {
	delay = delay || 3000;
	messagePanel
	.text(message)
	.addClass(cls)
	.fadeIn('slow')
	.delay(delay)
	.fadeOut('slow',function(){
		$(this).removeClass(cls);
		if(fn && (typeof fn === 'function')) {
			fn();
		}
	});
}
