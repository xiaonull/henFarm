var option = {
	url: 'api/henyard/attendrecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.attend_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new ConsiderationRecords(list[i])).template);
		}
	}
}

myAjax(option);

function ConsiderationRecords(data) {
	var templ = '';
		templ += '<div class="do-record">';
		templ += 	'<font class="prop-name">照顾</font>';
		templ += 	'<br>';
		templ += 	'<div class="consideration-successfully">照顾成功</div>';
		templ += 	'<div class="date-record">' + data.time + '</div>';
		templ += 	'<hr>';
		templ += '</div>';

	this.template = templ;
}

