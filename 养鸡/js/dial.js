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

	var rotateFn = function(awards, angles, txt) {
		bRotate = !bRotate;
		$('#rotate').stopRotate();
		$('#rotate').rotate({
			angle: 0,
			animateTo: angles + 1800,
			duration: 8000,
			callback: function() {
//				alert("￥" + txt);
				$('.mark').css('display','block');
				$('.award .award-top').html(txt + '元')
				bRotate = !bRotate;
			}
		})
	};

	$('.pointer').click(function() {
		var a = [1, 18, 16, 12, 2, 8, 6,20];
		if(bRotate) return;

		var item = rnd(0, 8);
		switch(item) {
			case 0:
				//var angle = [26, 88, 137, 185, 235, 287, 337];
				rotateFn(0, 320, a[0]);
				break;
			case 1:
				//var angle = [88, 137, 185, 235, 287];				
				rotateFn(1, 5, a[1]);
			case 2:
				//var angle = [137, 185, 235, 287];
				rotateFn(2, 50, a[2]);
				break;
			case 3:
				//var angle = [137, 185, 235, 287];
				rotateFn(3, 95, a[3]);
				break;
			case 4:
				//var angle = [185, 235, 287];
				rotateFn(4, 140, a[4]);
				break;
			case 5:
				//var angle = [185, 235, 287];
				rotateFn(5, 185, a[5]);
				break;
			case 6:
				//var angle = [235, 287];
				rotateFn(6, 230, a[6]);
				break;
			case 7:
				//var angle = [235, 287];
				rotateFn(7, 275,a[7]);
				break;
		}
	});
	$('.close').on('click',function(){
		$('.mark').css('display','none');
	});
	$('.sure').on('click',function(){
		$('.mark').css('display','none');
	});
	

});

function rnd(n, m) {
	return Math.floor(Math.random() * (m - n + 1) + n)
}