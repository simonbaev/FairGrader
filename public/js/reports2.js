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
					let reportData = projectData[option.val()];
					let container = $('#report-details').empty();
					console.log(reportData);
					if(reportData.gradees.length === 1) {
						//-- Student's view (chart)
					}
					else {
						//-- Faculty view (table)
						container
						.append(
							$('<div>')
							.addClass('table-responsive')
							.append(
								$('<table>').addClass('table table-hover').attr('id','faculty-view').append($('<thead>')).append($('<tbody>'))
							)
						);
						let thead = $('#faculty-view thead');
						let tbody = $('#faculty-view tbody');
						//-- Table header
						thead
						.append($('<th>').addClass('th-name').text('Name'))
						.append($('<th>').addClass('th-stat').text('Average'))
						.append($('<th>').addClass('th-stat').text('Deviation'))
						.append($('<th>').addClass('th-stat').text('Min'))
						.append($('<th>').addClass('th-stat').text('Max'))
						.append(
							$('<th>')
							.addClass('th-grader')
							.append(
								$('<form>')
								.addClass('form-inline')
								.append(
									$('<div>').addClass('form-group form-group-sm')
									.append($('<label>').text('Grader: '))
									.append($('<select>').addClass('form-control input-sm').append($('<option>').attr('value','--').text('--')).change(function(){
										//-- Grader changed
										let grader = $(this).find('option:selected').val();
										let tbody = $(this).parents('table').find('tbody');
										tbody.find('tr:not(.tr-comment)').each(function(){
											let gradee = $(this).attr('data-email');
											let temp = reportData.contributions[gradee][grader];
											$(this).find('.td-grader').text(temp ? temp.score.toFixed(2) : '--');
										});
									}))
								)
							)
						);
						let sortEmailArray = function(array) {
							return array.sort(function(a,b){
								let A = data.names[a].split(/\s/)[1].toLowerCase();
								let B = data.names[b].split(/\s/)[1].toLowerCase();
								return  (A < B) ? -1 : 1;
							});
						};
						for(let email of sortEmailArray(reportData.graders)) {
							$('.th-grader select').append($('<option>').attr('value',email).text(data.names[email]));
						}
						//-- Table body
						let getStats = function(array) {
							let average = array.reduce(function(acc,value){
								return acc + value;
							}, 0) / array.length;
							let deviation = Math.sqrt(array.map(function(entry){
								return Math.pow(entry - average, 2);
							})
							.reduce(function(acc,value){
								return acc + value;
							}, 0) / array.length);
							return {
								average: average.toFixed(2),
								deviation: deviation.toFixed(2),
								max: Math.max.apply(null,array).toFixed(2),
								min: Math.min.apply(null,array).toFixed(2)
							};
						};
						sortEmailArray(reportData.gradees).forEach(function(gradee) {
							let scores = Object.keys(reportData.contributions[gradee]).map(function(grader){
								return reportData.contributions[gradee][grader].score;
							});
							let comments = Object.keys(reportData.contributions[gradee]).map(function(grader){
								return {
									name: data.names[grader],
									text: reportData.contributions[gradee][grader].comment
								};
							}).filter(function(entry){
								return entry.text;
							});
							let stats = getStats(scores);
							let trGradee = $('<tr>').attr('data-email', gradee)
							.append(
								$('<td>')
								.addClass('td-gradee')
								.append($('<span>').text(data.names[gradee]))
								.append($('<span>').addClass('pull-right').addClass(comments.length ? 'glyphicon glyphicon-list-alt' : ''))
							)
							.append($('<td>').text(stats.average))
							.append($('<td>').text(stats.deviation))
							.append($('<td>').text(stats.min))
							.append($('<td>').text(stats.max))
							.append($('<td>').addClass('td-grader').text('--'));
							tbody.append(trGradee);
							if(comments.length) {
								console.log(comments);
								let trComments = $('<tr>').addClass('tr-comment').append($('<td>').attr('colspan','6').addClass('td-comment'));
								for(let comment of comments) {
									trComments.find('.td-comment').append(
										$('<blockquote>')
										.append($('<p>').text(comment.text))
										.append($('<footer>').html('By <i>' + comment.name + '</i>'))
									);
								}
								trGradee.find('.td-gradee span.glyphicon').click(function(){
									$(this).parents('tr').next().toggle();
								});
								tbody.append(trComments);
							}
						});
					}
				})
				.trigger('change');
			})
			.trigger('change');
		})
		.trigger('change');
	});
});


