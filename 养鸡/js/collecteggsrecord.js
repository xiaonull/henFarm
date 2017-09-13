var option = {
	url: 'api/henyard/eggpicking',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.egg_picking_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new CollectEggsRecords(list[i])).template);
		}
	}
}

myAjax(option);

function CollectEggsRecords(data) {
	var templ = '';
		templ += '<div class="do-record">';
		templ += 	'<font class="prop-name">收蛋</font>';
		templ += 	'<br>';
		templ += 	'<div class="collect-successfully">+10</div>';
		templ += 	'<div class="date-record">' + data.time + '</div>';
		templ += 	'<hr>';
		templ += '</div>';

	this.template = templ;
}

