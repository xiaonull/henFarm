$('.prompt').css('display','none');
var $prompt = $('.prompt');	

$(".eggExchangeGold .confirmSubmit-egg").on('click', function(event) {
	event.preventDefault();
	var eggNum = $(".eggExchangeGold .eggInput").val();
	if(eggNum > 0) {
		var option = {
			url: 'api/henyard/eggs2coins',
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
	}else {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入兑换鸡蛋数额');
	}
});

$(".eggExchangeGold .confirmSubmit-goldEgg").on('click', function(event) {
	event.preventDefault();
	var goldEggNum = $(".eggExchangeGold .goldEggInput").val();
	if(goldEggNum > 0) {
		var option = {
			url: 'api/henyard/eggs2coins',
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
	}else {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入兑换金蛋数额');
	}
});