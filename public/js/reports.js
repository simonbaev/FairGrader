/* jshint esnext: true */

let socket = io('/reports');
socket
.on('connect',function(){
	console.log('Data socket successfully connected to', JSON.stringify(socket.id,null,3));
})
.on('data', function(data){
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
				let displayData = projectData[option.val()].students;
				let displayKeys = Object.keys(displayData).sort();
				let container = $('#report-details').empty();
				if(displayKeys.length === 1) {
					//-- Student's case, render a chart
					//-= Prepare container
					container
					//-- Header (project topic)
					.append(
						$('<div>')
						.addClass('flex-center')
						.append($('<h4>').text(displayData[displayKeys[0]].topic.title))
					)
					//-- Chart
					.append(
						$('<div>')
						.addClass('ct-chart ct-my')
					)
					//-- Stat data
					.append(
						$('<fieldset>')
						.append($('<legend>').text('Statistical analysis'))
						.append(
							$('<div>')
							.addClass('fieldset-content')
							.append(
								$('<table>')
								.addClass('table table-bordered')
								.append(
									$('<thead>')
									.append(
										$('<tr>')
										.append($('<th>').text('Average'))
										.append($('<th>').text('Standard deviation'))
										.append($('<th>').text('Minimum'))
										.append($('<th>').text('Maximum'))
									)
								)
								.append(
									$('<tbody>')
									.append(
										$('<tr>')
										.append($('<td>').attr('id','stat-average'))
										.append($('<td>').attr('id','stat-deviation'))
										.append($('<td>').attr('id','stat-min'))
										.append($('<td>').attr('id','stat-max'))
									)
								)
							)
						)
					)
					//-- Comments
					.append(
						$('<fieldset>')
						.append($('<legend>').text('Comments'))
						.append(
							$('<div>')
							.attr('id','comments')
							.addClass('fieldset-content')
							.append(
								$('<h5>').text('No comments')
							)
						)
					);
					//-- Prepare and fill chart data
					let chartData = displayData[displayKeys[0]].contributions;
					let chartKeys = Object.keys(chartData);
					let chartLabels = chartKeys.map(function(entry,index,array){
						return 'S' + (index+1);
					});
					let chartSeries = chartKeys.map(function(entry,index,array){
						return chartData[entry].score;
					});
					$('.ct-chart').empty();
					new Chartist.Bar(
						'.ct-chart',
						{
							labels: chartLabels,
							series: [chartSeries]
						},
						{
							reverseData: true,
							horizontalBars: true,
							seriesBarDistance: 20,
							axisX: {
								labelOffset: {
									x: -10,
									y: 0
								},
							}
						},
						[
							[
								'screen and (min-width: 450px)', {
									reverseData: false,
									horizontalBars: false,
									axisY: {
										type: Chartist.FixedScaleAxis,
										labelInterpolationFnc: Chartist.noop,
										ticks: [0,10,20,30,40,50,60,70,80,90,100]
									},
									axisX: {
										labelOffset: {
											x: 0,
											y: 0
										},
									}
								}
							],
						]
					);
					//-- Calculate and display statistics
					let average = chartSeries.reduce(function(acc,value){
						return acc + value;
					}, 0) / chartSeries.length;
					let deviation = Math.sqrt(chartSeries.map(function(entry){
						return Math.pow(entry - average, 2);
					})
					.reduce(function(acc,value){
						return acc + value;
					}, 0) / chartSeries.length);
					$('#stat-average').text(average.toFixed(2));
					$('#stat-deviation').text(deviation.toFixed(2));
					$('#stat-min').text(Math.min.apply(null,chartSeries).toFixed(2));
					$('#stat-max').text(Math.max.apply(null,chartSeries).toFixed(2));
					//-- Comments
					let comments = chartKeys.map(function(entry,index,array){
						return {
							text: chartData[entry].comment,
							commenter: chartLabels[index]
						};
					})
					.filter(function(entry){
						return entry.text;
					});
					let commentsContainer = $('#comments').empty();
					comments.forEach(function(comment){
						commentsContainer
						.append(
							$('<blockquote>')
							.append($('<p>').text(comment.text))
							.append($('<footer>').html('From student <i>' + comment.commenter + '</i>'))
						);
					});
				}
				else {
					//-- Faculty case, render a summary table
					container
					.append(
						$('<div>')
						.addClass('table-responsive')
						.append(
							$('<table>')
							.addClass('table table-bordered')
							.append(
								$('<thead>')
								.append(
									$('<tr>').append($('<th>').attr('colspan','2').addClass('text-center').html('Graders &nbsp; <span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>'))
								)
							)
							.append(
								$('<tbody>')
							)
						)
					);
					let i = 0;
					let scoreExtractor = function(entry){
						return this[entry].score;
					};
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
					for(let rowKey of displayKeys) {
						let shortName = 'S' + (++i);
						//-- calculate stats
						let contributions = Object.keys(displayData[rowKey].contributions).map(scoreExtractor.bind(displayData[rowKey].contributions));
						let stats = getStats(contributions);
						//-- tooltip over e-mail
						let titleString = $('<div>')
						.append(
							$('<table>')
							.append($('<tr>').append($('<th>').attr({'colspan':'2'}).css('border-bottom','1px solid').text(rowKey)))
							.append($('<tr>').append($('<td>').text('Average')).append($('<td>').text(stats.average)))
							.append($('<tr>').append($('<td>').text('Deviation')).append($('<td>').text(stats.deviation)))
							.append($('<tr>').append($('<td>').text('Maximum')).append($('<td>').text(stats.max)))
							.append($('<tr>').append($('<td>').text('Minimum')).append($('<td>').text(stats.min)))
						)
						.find('td').addClass('text-left').end().html();
						//-- fill in <tr> element
						container.find('.table thead tr').append($('<th>').addClass('text-center').text(shortName));
						let tr = $('<tr>')
						.append(
							$('<td>')
							.addClass('text-primary')
							.attr({
								'title': titleString,
								'data-toggle': 'tooltip'
							})
							.text(rowKey)
						)
						.append($('<th>').text(shortName));
						for(let colKey of displayKeys) {
							let contribution = displayData[rowKey].contributions[colKey];
							let td = $('<td>').text(contribution ? contribution.score.toFixed(2) : '--');
							if(contribution && contribution.comment) {
								td.attr({
									'title': contribution.comment,
									'data-toggle': 'tooltip'
								})
								.addClass('text-primary')
								.css({
									'font-weight': 'bold',
								});
							}
							tr.append(td);
						}
						container.find('.table tbody').append(tr);
					}
					container.find('[data-toggle="tooltip"]').tooltip({container: 'body', html: true});
				}
			})
			.trigger('change');
		})
		.trigger('change');
	})
	.trigger('change');

});


