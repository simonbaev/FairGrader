/* jshint esnext: true */
let sockets = {
	eval: io('/eval'),
	api: io('/api')
};

sockets.api
.on('connect',function(){
	console.log('API socket successfully connected');
});

sockets.eval
.on('connect',function(){
	console.log('Data socket successfully connected');
})
.on('reconnect_error', function(err){
	console.log(err.message);
});

$(document).ready(function(){
	sockets.eval.emit('getProjectDetails', $('meta[name=project-id]').attr('content'), function(err, data){
		if(!data) {
			return;
		}
		//-- Table header
		let thead = $('#scores thead').empty();
		let headerRow = $('<tr>').append($('<th>').text('Student name')).append($('<th>').text('Active'));
		for(let criterium of data.project.criteria) {
			headerRow.append($('<th>').text(criterium.key + ' (' + (criterium.weight * 100).toFixed(1) + '%)'));
			$('.rubrics').append($('<li>').html('<span><b>[' + criterium.key + ']</b></span>&nbsp;<span>' + criterium.title + '</span>'));
		}
		headerRow
		.append($('<th>').addClass('th-total').text('local'))
		.append($('<th>').addClass('th-total').text('global'));
		thead.append(headerRow);
		//-- Team (topic) selector
		let teamContainer = $('#select-team').empty();
		data.topics.forEach(function(topic){
			teamContainer
			.append(
				$('<option>')
				.attr({
					'value': topic.key
				})
				.text(topic.title)
			);
		});
		teamContainer
		.find('option:eq(0)').attr('selected','').end()
		.change(function(){
			const defaultActive = true;
			let option = $(this).find('option:selected');
			let tbody = $('#scores tbody').empty();
			let topic = data.topics.find(function(topic){
				return topic.key === option.val();
			});
			//-- Checkbox for "Active" column to be cloned
			let cbTemplate = $('<input>').attr({'type':'checkbox', 'name': 'active'});
			//-- Append new row into <tbody> with just resolved student name
			let addRow = function(email, studentName) {
				let tr = $('<tr>');
				tr.append($('<td>').text(studentName));
				//-- Add Active checkbox
				let cb = cbTemplate.clone();
				if(defaultActive) {
					cb.attr('checked','');
				}
				tr.append(
					$('<td>')
					.append(cb.click(function(e){
						let tr = $(this).parents('tr');
						tr.find('.total-local').attr('data-active', this.checked);
						tr.find('input[name=slider]').slider(this.checked ? 'enable' : 'disable');
						e.stopPropagation();
					}))
					.click(function(){
						$(this).find('input').trigger('click');
					})
				);
				//-- Add sliders
				for(let criterium of data.project.criteria) {
					tr.append(
						$('<td>')
						.addClass('slider-container')
						.append(
							$('<input>')
							.attr({
								'type': 'text',
								'name': 'slider',
								'data-weight': criterium.weight,
								'data-slider-min': '0',
								'data-slider-max': '100',
								'data-slider-step': '1',
								'data-slider-value': '0',
								'data-slider-tooltip': 'hide',
								'data-slider-enabled': defaultActive ? "true" : "false",
							})
						)
					);
				}
				//-- Construct slider object
				tr.find('input[name=slider]').slider();
				//-- Register slider event(s)
				let slideHandler = function(e){
					let result = 0;
					let tr = $(this).parents('tr');
					let sliders = tr.find('input[name=slider]').toArray();
					for(let slider of sliders) {
						result += slider.value * slider.dataset.weight;
					}
					let value = result.toFixed(2);
					tr.find('.total-local').text(value).attr('data-value',value);
				};
				tr.find('input[name=slider]').on('slide', slideHandler).on('slideStop', slideHandler);
				//-- Add total (local)
				tr.append($('<td>').addClass('total-local').text(0).attr({
					'data-email': email,
					'data-value': 0,
					'data-active': defaultActive,
				}));
				//-- Add total (global)
				tr.append($('<td>').addClass('total-global').text(0));
				tbody.append(tr);
			};
			//-- Resolve student email into name
			topic.students.forEach(function(email){
				sockets.api.emit('getStudentByEmail', email, function(err, student){
					if(err || !student || !student.firstName || !student.lastName) {
						sockets.api.emit('getUserByEmail', email, function(data){
							if(data.status !== 0) {
								addRow(email, email);
							}
							else {
								addRow(email, data.name);
							}
						});
					}
					else {
						addRow(email, student.firstName + ' ' + student.lastName);
					}
				});
			});
		})
		.trigger('change');
		//-- Add Instructions toggler (click on "Instructions" legend to toggle)
		$('.instructions').find('legend').click(function(){
			$(this).next().toggle(1000);
		});
		setTimeout(function(){
			$('.instructions').find('legend').trigger('click');
		}, 60 * 1000);
		//-- Gather form data
		function getFormData() {
			return {
				project: $('meta[name=project-id]').attr('content'),
				topic: $('#select-team option:selected').val(),
				members: $('.total-local').toArray().map(function(td){
					return td.dataset;
				})
			};
		}
		//-- Submit action
		$('form').submit(function(){
			let data = getFormData();
			$.post('/eval', data, function(json){
				if(json.status === 0) {
					bootbox.alert({
						title: '<span class="text-success">Success</span>',
						message: 'Your contribution has been successfully submitted',
						onEscape: true,
						closeButton: false
					});
				}
				else if(json.status >= 100){
					bootbox.alert({
						title: '<span class="text-warning">Warning</span>',
						message: json.message,
						onEscape: true,
						closeButton: false
					});
				}
				else {
					bootbox.alert({
						title: '<span class="text-danger">Error</span>',
						message: json.message,
						onEscape: true,
						closeButton: false
					});
				}
			}, 'json');
			return false;
		});
	});
});