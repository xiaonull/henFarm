$(function() {
	addTurntableText();

	//	提示框
	$('.prompt').css('display','none');
	var $prompt = $('.prompt');

	var rotateTimeOut = function() {
		$('#rotate').rotate({
			angle: 0,
			animateTo: 2160,
			duration: 8000,
			callback: function() {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};
	var bRotate = false;

	var rotateFn = function(index, angles, img_path) {
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 1800,
			duration: 8000,
			callback: function() {
				$('.mark').css('display','block');
				// $('.mark .gift').attr({
				// 	src: img_path
				// });
				$('.mark .gift').css({
					display: 'none'
				});
				$('.award .award-top').html(
					$('.turntable .wheel-item').eq(index).find('.wheel-itext').text() + 
					'&nbsp;' + 
					$('.turntable .wheel-item').eq(index).find('.wheel-itext-num').text() +
					'个'
					);
				// $('.award .award-top').html('test');
				bRotate = !bRotate;
			}
		})
	};

	$('.pointer').click(function() {
		// var a = [1, 2, 3, 4, 5, 6, 7, 8];
		if(bRotate) return;

		var option = {
			url: 'api/henyard/luckywheel',
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				// console.log(result);
				if(result.status_code === 0) {
					var item = result.data.award.id - 1;
					pointGift(item, 'http://' + result.data.award.img_path);
				}else {
					$prompt.show().delay(2000).hide(300);
					$prompt.html(result.message);
				}
				
			}
		}

		myAjax(option);

		function pointGift(item, img_path) {
			switch(item) {
				case 0:
				rotateFn(0, 360, img_path);
				break;
				case 1:
				rotateFn(1, -45, img_path);
				case 2:
				rotateFn(2, -90, img_path);
				break;
				case 3:
				rotateFn(3, -135, img_path);
				break;
				case 4:
				rotateFn(4, -180, img_path);
				break;
				case 5:
				rotateFn(5, -225, img_path);
				break;
				case 6:
				rotateFn(6, -270, img_path);
				break;
				case 7:
				rotateFn(7, -315, img_path);
				break;
			}
		}
		
	});

	$('.close').on('click',function(){
		$('.mark').css('display','none');
		// window.location.assign("home.html");
	});

	$('.sure').on('click',function(){
		$('.mark').css('display','none');
		// window.location.assign("home.html");
	});
	

});

// function rnd(n, m) {
// 	return Math.floor(Math.random() * (m - n + 1) + n)
// }


function addTurntableText() {
	var option = {
		url: 'api/henyard/getluckywheel',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			// console.log(result);
			var all_awards = result.data.all_awards;
			if(all_awards.length > 0) {
				$('.turntable .wheel-item').find('.wheel-itext').html('');
				$('.turntableBgImg').attr({
					src: result.data.background,
				});
			}

			// else {
			// 	$('.turntableBgImg').attr({
			// 		src: 'img/dial/draw-bg0.png',
			// 	});
			// }
			
			for(var i = 0, j = 8; i < j; i++) {
				$('.turntable .wheel-item').eq(i).find('.wheel-itext').css('display', 'none');
				$('.turntable .wheel-item').eq(i).find('.wheel-itext-num').css('display', 'none');
			}

			for(var i = 0, j = all_awards.length; i < j; i++) {
				$('.turntable .wheel-item').eq(i).find('.wheel-itext').text(all_awards[i].name);
				$('.turntable .wheel-item').eq(i).find('.wheel-itext').css('display', 'none');
				$('.turntable .wheel-item').eq(i).find('.wheel-itext-num').text(all_awards[i].number);
				$('.turntable .wheel-item').eq(i).find('.wheel-itext-num').css('display', 'none');
			}
		}
	}

	myAjax(option);

}