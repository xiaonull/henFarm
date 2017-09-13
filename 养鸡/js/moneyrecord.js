var option = {
	url: 'api/henyard/coinsinandout',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.coin_using;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new MoneyRecords(list[i])).template);
		}
	}
}

myAjax(option);

function MoneyRecords(data) {
	var templ = '';
		templ += '<div class="do-record">';
		templ += 	'<font class="prop-name">' + data.item + '</font>';
		templ += 	'<br>';
		templ += 	'<div class="buy-successfully">' + data.num + '</div>';
		templ += 	'<div class="date-record">' + data.time + '</div>';
		templ += 	'<hr>';
		templ += '</div>';

	this.template = templ;
}

