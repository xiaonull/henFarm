var option = {
	url: 'api/henyard/growthrecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.growth_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new GrowRecords(list[i])).template);
		}
	}
}

myAjax(option);


// $.ajax({
// 	url: 'api/henyard/growthrecords',
// 	type: 'GET',
// 	dataType: 'jsonp',
// 	beforeSend: function(xhr) {
//         xhr.setRequestHeader("Authorization", "Bearer " + JSON.stringify(token));
//     },
// 	success: function(result) {
// 		var list = [];
// 		list = result.data.growth_records;
// 		for(var i = 0, j = list.length; i < j; i++) {
// 			$(".container").append((new GrowRecords(list[i])).template);
// 		}
// 	}
// });


function GrowRecords(data) {
	var templ = '';
		templ += '<div class="do-record">';
		templ += 	'<font class="prop-name">' + data.item + '</font>';
		templ += 	'<br>';
		templ += 	'<div class="grow-successfully">获得收益</div>';
		templ += 	'<div class="date-record">' + data.time + '</div>';
		templ += 	'<hr>';
		templ += '</div>';

	this.template = templ;
}