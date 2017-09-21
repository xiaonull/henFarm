// 控制背景音乐
if(!localStorage.musicFlag) {
	localStorage.musicFlag = 'open';
}

(function() {
	var mainBgMusic = document.getElementById('mainBgMusic');
	if(localStorage.musicFlag === 'close') {
		// 关闭音乐
		mainBgMusic.pause();
		$('.mainBgMusicCtrl').css('backgroundImage', 'url("./img/home/music-close.png")');
	}

	$('.mainBgMusicCtrl').on('click', function() {
		var mainBgMusic = document.getElementById('mainBgMusic');
		if(localStorage.musicFlag === 'open') {
			// 关闭音乐
			mainBgMusic.pause();
			localStorage.musicFlag = 'close';
			$('.mainBgMusicCtrl').css('backgroundImage', 'url("./img/home/music-close.png")');
		}else {
			// 开启音乐
			mainBgMusic.play();
			localStorage.musicFlag = 'open';
			$('.mainBgMusicCtrl').css('backgroundImage', 'url("./img/home/music.png")');
		}
	});
})();



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
			if(result.data.number) {
				$(".box-glod .box-glod-r li").eq(1).html('获得<span>' + result.data.number + '个</span>' + result.data.item);
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
