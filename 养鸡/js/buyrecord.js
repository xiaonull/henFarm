$(".buyRecordNav li").on("click", function() {
	$(".buyRecordNav li").removeClass("active");
	$(this).addClass("active");
	var index = -1;
	for(var i = 0, j = $(".buyRecordNav li").length; i < j; i++) {
		if(this === $(".buyRecordNav li").eq(i)[0]) {
			index = i;
			break;
		}
	}

	switchPanel(index);

});

function switchPanel(index) {
	$(".buyRecordPanel .active").removeClass("active");
	$(".buyRecordPanel section").eq(index).addClass("active");

} 


var proppurchaserecordsOption = {
	url: 'api/henyard/proppurchaserecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data.prop_purchase_records;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container .propPannel").append((new Proppurchaserecords(list[i])).template);
		}
	}
}

myAjax(proppurchaserecordsOption);


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

var giftrecordsOption = {
	url: 'api/henyard/purchaserecords',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		var list = [];
		list = result.data;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container .giftPannel").append((new Giftrecords(list[i])).template);
		}
	}
}

myAjax(giftrecordsOption);

function Giftrecords(data) {
	var templ = '';
	templ += '<div class="do-record">';
	templ += 	'<font class="prop-name">' + data.name + '</font>';
	templ += 	'<br>';
	templ += 	'<div class="buy-successfully">' + data.price + '</div>';
	templ += 	'<div class="date-record">' + data.time + '</div>';
	templ += 	'<hr>';
	templ += '</div>';

	this.template = templ;
}

var sendrecordsOption = {
	url: 'api/transactions/egg/records',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		// console.log(result);
		var list = [];
		list = result.data;
		for(var i = 0, j = list.length; i < j; i++) {
			$(".container .sendPannel").append((new Sendrecords(list[i])).template);
		}
	}
}

myAjax(sendrecordsOption);

function Sendrecords(data) {
	var templ = '';
	templ += '<div class="do-record">';
	templ += 	'<font class="prop-name">' + data.goods + '</font>';
	templ += 	'<br>';
	templ += 	'<div class="buy-successfully">' + data.target + '</div>';
	templ += 	'<div class="date-record">' + data.time + '</div>';
	templ += 	'<hr>';
	templ += '</div>';

	this.template = templ;
}