/* jshint esnext: true */

let socket = io('/reports');
socket
.on('connect',function(){
	console.log('Data socket successfully connected to', JSON.stringify(socket.id,null,3));
})
.on('data', function(data){
	console.log(data);
	//-- Depending on the number of terms in data we display either a a list of terms or jump to "the only one"
	if(Object.keys(data).length === 1) {
		$('.breadcrumb')
		.append(
			$('<li>')
			.addClass('bc-reports')
			.append(
				$('<a>')
				.attr({
					'href': '/reports',
				})
				.text('Reports')
			)
		);
		termClickHandler.call(data[Object.keys(data)[0]]);
	}
	else {
		$('.breadcrumb')
		.append(
			$('<li>')
			.addClass('active')
			.text('Reports')
		);
		$('.selector')
		.empty()
		.append($('<fieldset>').append($('<legend>').text('Please select the term')))
		.append($('<ul>').addClass('list-unstyled'));
		for(let term in data) {
			$('.selector ul')
			.append(
				$('<li>')
				.append(
					$('<a>')
					.text(data[term].title)
					.attr({
						'href': '#',
						'data-term': term
					})
					.click(termClickHandler.bind(data[term]))
				)
			);
		}
	}
});

function termClickHandler() {
	let data = this;
	let subData = data.courses;
	let subDataKeys = Object.keys(subData);
	console.log(data);
	if(subDataKeys.length === 1) {
		if($('.bc-term').length) {
			$('.bc-reports').nextAll().remove();
		}
		$('.breadcrumb')
		.append(
			$('<li>')
			.addClass('bc-term')
			.append(
				$('<a>')
				.attr({
					'href': '#',
				})
				.click(courseClickHandler.bind(data))
				.text(data.title)
			)
		);
		courseClickHandler(subData[subDataKeys[0]].projects);
	}
	else {

	}
}
function courseClickHandler() {
	let data = this;
	console.log(data);
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
