// var option = {
// 	url: 'api/henyard/growthrecords',
// 	beforeSend: function(xhr) {
// 	},
// 	complete: function(xhr) {
// 	},
// 	success: function(result) {
// 		var list = [];
// 		list = result.data.growth_records;
// 		for(var i = 0, j = list.length; i < j; i++) {
// 			$(".container").append((new ExpeditionRecords(list[i])).template);
// 		}
// 	}
// }

// myAjax(option);

// function ExpeditionRecords(data) {
// 	var templ = '';
// 		templ += '<div class="do-record">';
// 		templ += 	'<font class="prop-name">' + data.item + '</font>';
// 		templ += 	'<br>';
// 		templ += 	'<div class="grow-successfully">获得收益</div>';
// 		templ += 	'<div class="date-record">' + data.time + '</div>';
// 		templ += 	'<hr>';
// 		templ += '</div>';

// 	this.template = templ;
// }