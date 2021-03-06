var option = {
	url: 'api/henyard/feedrecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.feed_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new FeedRecords(list[i])).template);
		}
	}
}

myAjax(option);


// $.ajax({
// 	url: 'api/henyard/feedrecords',
// 	type: 'GET',
// 	dataType: 'jsonp',
// 	beforeSend: function(xhr) {
// 		xhr.setRequestHeader("Authorization", "Bearer " + JSON.stringify(token));
// 	},
// 	success: function(result) {
// 		var list = [];
// 		list = result.data.feed_records;
// 		for(var i = 0, j = list.length; i < j; i++) {
// 			$(".container").append((new FeedRecords(list[i])).template);
// 		}
// 	}
// });


function FeedRecords(data) {
	var templ = '';
	templ += '<div class="do-record">';
	templ += 	'<font class="prop-name">喂养</font>';
	templ += 	'<br>';
	templ += 	'<div class="feed-successfully">+10成长值</div>';
	templ += 	'<div class="date-record">' + data.time + '</div>';
	templ += 	'<hr>';
	templ += '</div>';

	this.template = templ;
}