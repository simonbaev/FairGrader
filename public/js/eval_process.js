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
	let temp = document.querySelector('#project-coordinates').dataset;
	sockets.eval.emit('getProjectDetails', temp, function(err, data){
		console.log(data);
		//-- team selector
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
			let option = $(this).find('option:selected');
			let tbody = $('#scores tbody').empty();
			let thead = $('#scores thead').empty();
			let topic = data.topics.find(function(topic){
				return topic.key === option.val();
			});
			//-- Add criteria into <thead>
			let headerRow = thead.append($('<tr>').append($('<th>').text('Student name')));
			for(let criterium of data.project.criteria) {
				thead.find('tr').append($('<th>').text(criterium.title + ' (' + (criterium.weight * 100).toFixed(1) + '%)'));
			}
			let addRow = function(studentName) {
				//-- Prepare table row to represent particular student
				let tr = $('<tr>');
				tr.append($('<td>').text(studentName));
				tbody.append(tr);
			};
			topic.students.forEach(function(email){
				sockets.api.emit('getStudentByEmail', email, function(err, student){
					if(err || !student || !student.firstName || !student.lastName) {
						sockets.api.emit('getUserByEmail', email, function(data){
							if(data.status !== 0) {
								addRow(email);
							}
							else {
								addRow(data.name);
							}
						});
					}
					else {
						addRow(student.firstName + ' ' + student.lastName);
					}
				});
			});
		})
		.trigger('change');
	});
});