var option = {
	url: 'api/henyard/curerecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.cure_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new CureRecords(list[i])).template);
		}
	}
}

myAjax(option);


// $.ajax({
// 	url: 'api/henyard/curerecords',
// 	type: 'GET',
// 	dataType: 'jsonp',
// 	beforeSend: function(xhr) {
//         xhr.setRequestHeader("Authorization", "Bearer " + JSON.stringify(token));
//     },
// 	success: function(result) {
// 		var list = [];
// 		list = result.data.cure_records;
// 		for(var i = 0, j = list.length; i < j; i++) {
// 			$(".container").append((new Records(list[i])).template);
// 		}
// 	}
// });


function CureRecords(data) {
	var templ = '';
		templ += '<div class="do-record">';
		templ += 	'<font class="prop-name">治疗</font>';
		templ += 	'<br>';
		templ += 	'<div class="cure-successfully">治疗成功</div>';
		templ += 	'<div class="date-record">' + data.time + '</div>';
		templ += 	'<hr>';
		templ += '</div>';

	this.template = templ;
}