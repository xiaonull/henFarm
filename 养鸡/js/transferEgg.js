$('.prompt').css('display','none');
var $prompt = $('.prompt');	

//	手机号码正则表达式
var myreg = /^1[34578]\d{9}$/;

$(".transferEgg .confirmSubmit-egg").on('click', function(event) {
	event.preventDefault();
	var eggNum = $(".transferEgg .eggInput").val();
	var phone = $(".transferEgg .phoneInput").val();

	if(eggNum > 0 && myreg.test(phone)) {
		var option = {
			url: 'api/henyard/transfer',
			type: 'POST',
			data: {
				egg: eggNum,
				golden_egg: 0
			},
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				$prompt.show().delay(2000).hide(300);
				$prompt.html(result.message);
			}
		}

		myAjax(option);
	}else if(!myreg.test(phone)) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入正确的手机号码！');
	}else if(eggNum <= 0) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入转赠鸡蛋数额');
	}
});

$(".transferEgg .confirmSubmit-goldEgg").on('click', function(event) {
	event.preventDefault();
	var goldEggNum = $(".transferEgg .goldEggInput").val();
	var phone = $(".transferEgg .phoneInput").val();
	if(goldEggNum > 0 && myreg.test(phone)) {
		var option = {
			url: 'api/henyard/transfer',
			type: 'POST',
			data: {
				egg: 0,
				golden_egg: goldEggNum
			},
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				$prompt.show().delay(2000).hide(300);
				$prompt.html(result.message);
			}
		}

		myAjax(option);
	}else if(!myreg.test(phone)) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入正确的手机号码！');
	}else if(goldEggNum <= 0) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入转赠金蛋数额');
	}
});