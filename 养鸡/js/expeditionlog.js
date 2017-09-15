var option = {
	url: 'api/henyard/adventure/records',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new ExpeditionRecords(list[i])).template);
		}
	}
}

myAjax(option);

function ExpeditionRecords(data) {
	var templ = '';
		templ += '<div class="do-record">';
		templ += 	'<font class="prop-name">探险成功</font>';
		templ += 	'<br>';
		templ += 	'<div class="expedition-successfully">' + data.item + ' ' + data.num + '</div>';
		templ += 	'<div class="date-record">' + data.time + '</div>';
		templ += 	'<hr>';
		templ += '</div>';

	this.template = templ;
}

