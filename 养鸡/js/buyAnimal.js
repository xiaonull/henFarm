$('.prompt').css('display','none');
var $prompt = $('.prompt');	

$(".buyAnimal .confirmSubmit-hen").on('click', function(event) {
	event.preventDefault();
	var henNum = $(".buyAnimal .henInput").val();
	if(henNum > 0) {
		var option = {
			url: 'api/shop/animal',
			type: 'POST',
			data: {
				hen: henNum
				// wild_goose: 0
			},
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				// console.log(result);
				if(result.data.redirect_url) {
					window.location.assign(result.data.redirect_url);
				}else {
					$prompt.show().delay(2000).hide(300);
					$prompt.html(result.message);
				}
				
			}
		}

		myAjax(option);
	}else {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入购买鸡的数额');
	}
});

// $(".buyAnimal .confirmSubmit-wild_goose").on('click', function(event) {
// 	event.preventDefault();
// 	var wild_gooseNum = $(".buyAnimal .wild_gooseInput").val();
// 	if(wild_gooseNum > 0) {
// 		var option = {
// 			url: 'api/shop/animal',
// 			type: 'POST',
// 			data: {
// 				hen: 0,
// 				wild_goose: wild_gooseNum
// 			},
// 			beforeSend: function(xhr) {
// 			},
// 			complete: function(xhr) {
// 			},
// 			success: function(result) {
// 				$prompt.show().delay(2000).hide(300);
// 				$prompt.html(result.message);
// 			}
// 		}

// 		myAjax(option);
// 	}else {
// 		$prompt.show().delay(2000).hide(300);
// 		$prompt.html('请输入购买雁的数额');
// 	}
// });