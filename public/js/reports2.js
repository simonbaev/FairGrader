/* jshint esnext: true */
let sockets = {
	report: io('/reports2'),
	api: io('/api')
};

sockets.api
.on('connect',function(){
	console.log('API socket successfully connected');
});
sockets.report
.on('connect',function(){
	console.log('Data socket successfully connected');
});

$(document).ready(function(){
	sockets.report.emit('getData', function(data){
		if(!data) {
			console.error('No data to render');
			return;
		}
		console.log(data);
		//-- Set term select
		let termData = data;
		let termKeys = Object.keys(data);
		if(!termKeys.length) {
			$('#report-details').empty().append($('<h4>').addClass('text-warning').text('No report data found'));
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
				projectSelect.find('option:eq(0)').attr('selected','');
				projectSelect.change(function(){
					//-- Update the chart or table
					let option = $(this).find('option:selected');
					let data = projectData[option.val()];
					if(data.gradees.length === 1) {
						//-- Student's view (chart)
					}
					else {
						//-- Faculty view (table)
					}
				})
				.trigger('change');
			})
			.trigger('change');
		})
		.trigger('change');
	});
});


