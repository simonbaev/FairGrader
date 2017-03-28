/* jshint esnext: true */

function termCodeToString(termCode) {
	let year = termCode.slice(0,4);
	let semester = {'02':'Spring', '05':'Summer', '08':'Fall'}[termCode.slice(4)];
	return semester + ' ' + year;
}
function courseToString(course) {
	return course.split(/_/).join(' ');
}


$(document).ready(function() {
	let chartData = JSON.parse(document.querySelector('#chart').dataset.chart);
	console.log(chartData);
	/*
	let term = '201702';
	let course = 'CSCI_4940';
	let project = 'MT';
	if(chartData &&
		chartData[term] &&
		chartData[term][course] &&
		chartData[term][course][project] &&
		chartData[term][course][project].students) {
		let displayData = chartData[term][course][project].students;
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
