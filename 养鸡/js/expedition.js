$(function(){
	var num = parseInt($('.time-num').html());
	var timer=setInterval(function(){
		num--;	
		console.log(num);
		if(num<0){
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
