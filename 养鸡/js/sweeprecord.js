var option = {
	url: 'api/henyard/sweeprecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.sweep_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new SweepRecords(list[i])).template);
		}
	}
}

myAjax(option);

function SweepRecords(data) {
	var templ = '';
		templ += '<div class="do-record">';
		templ += 	'<div class="do-successfully">打扫成功</div>';
		templ += 	'<div class="date-record">' + data.swept_at + '</div>';
		templ += 	'<hr>';
		templ += '</div>';

	this.template = templ;
}

