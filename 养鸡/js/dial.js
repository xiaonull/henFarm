$(function() {
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

	var rotateFn = function(awards, angles, img_path, txt) {
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
				$('.award .award-top').html(txt)
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
				var item = result.data.award.id - 1;
				pointGift(item, 'http://' + result.data.award.img_path);
			}
		}

		myAjax(option);

		function pointGift(item, img_path) {
			switch(item) {
				case 0:
				rotateFn(0, 360, img_path, '1元');
				break;
				case 1:
				rotateFn(1, -45, img_path, '2元');
				case 2:
				rotateFn(2, -90, img_path, '3元');
				break;
				case 3:
				rotateFn(3, -135, img_path, '4元');
				break;
				case 4:
				rotateFn(4, -180, img_path, '5元');
				break;
				case 5:
				rotateFn(5, -225, img_path, '6元');
				break;
				case 6:
				rotateFn(6, -270, img_path, '7元');
				break;
				case 7:
				rotateFn(7, -315, img_path, '8元');
				break;
			}
		}
		
	});

	$('.close').on('click',function(){
		$('.mark').css('display','none');
		window.location.assign("home.html");
	});

	$('.sure').on('click',function(){
		$('.mark').css('display','none');
		window.location.assign("home.html");
	});
	

});

// function rnd(n, m) {
// 	return Math.floor(Math.random() * (m - n + 1) + n)
// }