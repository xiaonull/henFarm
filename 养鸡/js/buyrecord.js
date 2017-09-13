var option = {
	url: 'api/henyard/proppurchaserecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.prop_purchase_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container").append((new Proppurchaserecords(list[i])).template);
		}
	}
}

myAjax(option);


// $.ajax({
// 	url: 'api/henyard/proppurchaserecords',
// 	type: 'GET',
// 	dataType: 'jsonp',
// 	beforeSend: function(xhr) {
// 		xhr.setRequestHeader("Authorization", "Bearer " + JSON.stringify(token));
// 	},
// 	success: function(result) {
// 		var list = [];
// 		list = result.data.prop_purchase_records;
// 		for(var i = 0, j = list.length; i < j; i++) {
// 			$(".container").append((new Proppurchaserecords(list[i])).template);
// 		}
// 	}
// });


function Proppurchaserecords(data) {
	var templ = '';
	templ += '<div class="do-record">';
	templ += 	'<font class="prop-name">' + data.prop_name + '</font>';
	templ += 	'<br>';
	templ += 	'<div class="buy-successfully">购买成功</div>';
	templ += 	'<div class="date-record">' + data.time + '</div>';
	templ += 	'<hr>';
	templ += '</div>';

	this.template = templ;
}