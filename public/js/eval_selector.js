/* jshint esnext: true */

let socket = io('/eval');
socket
.on('connect',function(){
	console.log('Data socket successfully connected');
	//-- request details on all authorized and active projects to layer them onto 3 selectors
	this.emit('getProjects', null, function(err, data){
		if(err) {
			console.error(err.message);
			return false;
		}
		//-- Set term select
		let termData = data;
		let termKeys = Object.keys(data);
		if(!termKeys.length) {
			return false;
		}
		let termSelect = $('#select-term').empty();
		for(let term of termKeys) {
			termSelect
			.append(
				$('<option>')
				.attr({
					'value': term
				})
				.text(termData[term].title)
			);
		}
		termSelect.find('option:eq(0)').attr('selected','');
		termSelect.change(function(){
			//-- Set course within the selected term
			let option = $(this).find('option:selected');
			let courseData = termData[option.val()].courses;
			let courseKeys = Object.keys(courseData);
			let courseSelect = $('#select-course').empty();
			for(let course of courseKeys) {
				courseSelect
				.append(
					$('<option>')
					.attr({
						'value': course
					})
					.text(course.toUpperCase().split(/_/).join(' ') + ' ' + courseData[course].title)
				);
			}
			courseSelect.find('option:eq(0)').attr('selected','');
			courseSelect.change(function(){
				//-- Set project within the selected course
				let option = $(this).find('option:selected');
				let projectData = courseData[option.val()].projects;
				let projectKeys = Object.keys(projectData);
				let projectSelect = $('#select-project').empty();
				for(let project of projectKeys) {
					projectSelect
					.append(
						$('<option>')
						.attr({
							'value': project
						})
						.text(projectData[project].title)
					);
				}
				projectSelect
				.find('option:eq(0)')
				.attr('selected','');
				$('#start').removeAttr('disabled').click(function(){
					location.assign(location.pathname + '/' + $('#select-term').val() + '/' + $('#select-course').val() + '/' + $('#select-project').val());
				});
			})
			.trigger('change');
		})
		.trigger('change');
	});
})
.on('error', function(message){
	console.log(message);
});


