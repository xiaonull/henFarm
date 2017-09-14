$(function(){
	var num = parseInt($('.time-num').html());
	var timer=setInterval(function(){
		num--;	
		// console.log(num);
		if(num<0){
			myAjax(option);
			$('.mark').css('display','block');
			clearInterval(timer);
		}
		if(num>=10){
			$('.time-num').html(num);
		}else{
			$('.time-num').html('0'+num);
		}		
	},1000);
});


var option = {
	url: 'api/henyard/adventure',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		console.log(result);
		if(result.status_code === 0) {
			$(".box-glod img").attr({
				src: 'img/expedition/correct.png'
			});
			$(".box-glod .box-glod-r li").eq(0).text('恭喜探险成功');
			if(result.data.award.number) {
				$(".box-glod .box-glod-r li").eq(1).html('获得<span>' + result.data.award.number + '</span>' + result.data.award.item_name);
			}
			
		}else {
			$(".box-glod img").attr({
				src: 'img/expedition/close.png'
			});
			$(".box-glod .box-glod-r li").eq(0).text(result.message);
			$(".box-glod .box-glod-r li").eq(1).html('');
		}
	}
}
