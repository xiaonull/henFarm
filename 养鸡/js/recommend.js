var option = {
	url: 'api/henyard/getqrcode',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		$(".codeImg").attr({
			'src': result
		});
	}
}

myAjax(option);

