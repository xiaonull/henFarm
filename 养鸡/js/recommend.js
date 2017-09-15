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



// var option = {
// 	url: 'api/henyard/getluckywheel',
// 	beforeSend: function(xhr) {
// 	},
// 	complete: function(xhr) {
// 	},
// 	success: function(result) {
// 		console.log(result);
// 		console.log(result.data.all_awards[0].img_path);
// 		$(".codeImg").attr({
// 			'src': 'http://' + result.data.all_awards[2].img_path
// 		});
// 	}
// }

// myAjax(option);

