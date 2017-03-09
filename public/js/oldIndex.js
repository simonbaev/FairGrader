/*jshint esnext: true*/

function overallScoreUpdateHandler(value) {
	let overallGroupScore = parseInt(value);
	$('table.table tbody tr').each(function(tr){
		let progressScore = parseInt($(this).find('input[name=progress]').slider('getValue'));
		let presentationScore = parseInt($(this).find('input[name=presentation]').slider('getValue'));
		let total = overallGroupScore / 100 * 0.5 * (progressScore + presentationScore);
		$(this).find('td').last().text(total.toFixed(0));
	});
}

$(document).ready(function () {
	$('#my-name').change(function(){
		let select = $(this);
		if(select.find('option:selected').val() === '--') {
			$('form .name-hidable').addClass('name-hidden');
		}
		else {
			$('form .name-hidable').removeClass('name-hidden');
			$('#my-email').val(select.find('option:selected').attr('data-value'));
		}
	});
	$('#topic').change(function(){
		let select = $(this);
		let option = select.find('option:selected').val();
		if(option === '--') {
			$('form .topic-hidable').addClass('topic-hidden');
		}
		else {
			$('form .topic-hidable').removeClass('topic-hidden');
			let topic = JSON.parse(select.attr('data-topics'))[option];
			$('#overall').slider('setValue',100);
			$('table.table tbody').empty();
			for(let student of topic.students) {
				$('table.table tbody')
				.append(
					$('<tr>')
					.append(
						$('<td>')
						.append(
							$('<input>')
							.attr({
								'type': 'hidden',
								'name': 'member-name',
								'value': student.name
							})
						)
						.append(
							$('<input>')
							.attr({
								'type': 'hidden',
								'name': 'member-email',
								'value': student.email
							})
						)
						.append(
							$('<span>').text(student.name)
						)
					)
					.append(
						$('<td>')
						.addClass('slider-container')
						.append(
							$('<input>')
							.attr({
								'type': 'text',
								'name': 'progress',
								'data-slider-min': '0',
								'data-slider-max': '100',
								'data-slider-step': '1',
								'data-slider-value': '0',
								'data-slider-tooltip': 'hide'
							})
						)
					)
					.append($('<td>').addClass('text-center'))
					.append(
						$('<td>')
						.addClass('slider-container')
						.append(
							$('<input>')
							.attr({
								'type': 'text',
								'name': 'presentation',
								'data-slider-min': '0',
								'data-slider-max': '100',
								'data-slider-step': '1',
								'data-slider-value': '0',
								'data-slider-tooltip': 'hide'
							})
						)
					)
					.append($('<td>').addClass('text-center'))
					.append(
						$('<td>').addClass('text-center')
					)
				);
			}
			$('table.table input[name=progress]').slider();
			$('table.table input[name=presentation]').slider();
			$('table.table .slider-container input')
			.on('slide', function(e){
				$(this).parents('td').next().text(e.value);
			})
			.on('slideStop', function(e){
				$(this).parents('td').next().text(e.value);
				let progressScore = parseInt($(this).parents('tr').find('input[name=progress]').slider('getValue'));
				let presentationScore = parseInt($(this).parents('tr').find('input[name=presentation]').slider('getValue'));
				let overallGroupScore = parseInt($('#overall').slider('getValue'));
				let total = overallGroupScore / 100 * 0.5 * (progressScore + presentationScore);
				$(this).parents('tr').find('td').last().text(total.toFixed(0));
			})
			.each(function(){
				$(this).parents('td').next().text($(this).slider('getValue'));
			});
			overallScoreUpdateHandler($('#overall').slider('getValue'));
		}
	});
	$('#overall').slider();
	$('#overall').on('slideStop',function(e){
		overallScoreUpdateHandler(e.value);
	});

	$('form').submit(function(){
		let data = $(this).serialize();
		$.post('/old', data, function(json){
			if(json.status === 0) {
				bootbox.alert({
					title: 'Thank you',
					message: 'Your contribution has been accepted. An e-mail with <b>confirmation</b> link will shortly be sent to your RADAR account. Please follow that link within time window of 24 hours to finalize your input.',
					onEscape: true,
					closeButton: false

				});
			}
			else {
				console.error(JSON.stringify(jsaon,null,3));
			}
		},'json');
		return false;
	});

});