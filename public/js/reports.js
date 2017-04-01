/* jshint esnext: true */

let socket = io('/reports');
socket
.on('connect',function(){
	console.log('Data socket successfully connected to', JSON.stringify(socket.id,null,3));
})
.on('data', function(data){
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
				let displayData = projectData[option.val()].students;
				let displayKeys = Object.keys(displayData);
				let container = $('#report-details').empty();
				if(displayKeys.length === 1) {
					//-- Student's case, render a chart
					//-= Prepare container
					container
					.append(
						$('<div>')
						.addClass('flex-center')
						.append($('<h3>').text(displayData[displayKeys[0]].topic.title))
					)
					.append(
						$('<div>')
						.addClass('ct-chart ct-my')
					)
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
					//-- Populate chart with series data
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
				}
				else {
					//-- Faculty case, render a summary table

				}
			})
			.trigger('change');
		})
		.trigger('change');
	})
	.trigger('change');

});

function setSelect(data,select) {

}

$(document).ready(function() {
	/*
		//-- Breadcrumb
		$('.breadcrumb')
		.append($('<li>').append($('<a>').attr({'href':'#'}).text('Reports')))
		.append($('<li>').append($('<a>').attr({'href':'#'}).text(termCodeToString(term))))
		.append($('<li>').append($('<a>').attr({'href':'#'}).text(courseToString(course))))
		.append($('<li>').addClass('active').text(project));
		if(Object.keys(displayData).length === 1) {
			//-- Student's view with only one e-mail
			let student = displayData[Object.keys(displayData)[0]];
			let name = student.name;
			let labelInterpolationFnc = function(value) {
				let parts = value.split(/\s+/);
				return parts[0][0] + parts[1];
			};
			if (student.scores.labels.length) {
				new Chartist.Bar(
					'.ct-chart',
					{
						labels: student.scores.labels.map(function(label, index, array) {
							return label || "Student " + (index + 1);
						}),
						series: [student.scores.criteria.calculated]
					},
					{
						reverseData: true,
						horizontalBars: true,
						seriesBarDistance: 20,
						axisY: {
							labelInterpolationFnc: labelInterpolationFnc
						},
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
									// type: Chartist.StepAxis,
									labelInterpolationFnc: labelInterpolationFnc,
									labelOffset: {
										x: 0,
										y: 0
									},
								}
							}
						],
					]
				);
			}
		}
	}
	else {
		$('.reports-body').empty().append(
			$('<h3>')
			.addClass('text-info')
			.text('No report data found')
		);
	}
	*/
});
