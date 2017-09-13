function Chicken(obj) {
	this.oChicken = obj;
	this.timer = null;
	this.oChicken.style.top = Math.random() * 100 + '%';
	this.oChicken.style.left = Math.random() * 100 + '%';	
}
Chicken.prototype.move = function() {
	this.oChicken.style.top = Math.random() * 100 + '%';
	this.oChicken.style.left = Math.random() * 100 + '%';	
	this.timer = setInterval(function() {
		this.oChicken.style.top = Math.random() * 100 + '%';
		this.oChicken.style.left = Math.random() * 100 + '%';	
	}.bind(this), 20000);
}
window.onload = function() {
	var aChickens = document.querySelectorAll('.runs div');
	for(var i = 0, len = aChickens.length; i < len; i++) {
		new Chicken(aChickens[i]).move();
	}

	showResources();

}

function showResources() {
	$.ajax({
		url: 'http://farmapi.niowoo.cn/api/henyard',
		type: 'GET',
		dataType: 'jsonp',
		success: function(result) {
			$(".box-left p").eq(0).html("&nbsp;" + result.data.hen_num);
			$(".box-left p").eq(1).html("&nbsp;" + result.data.egg_num);
			$(".box-left p").eq(2).html("&nbsp;" + result.data.golden_egg_num);
			$(".box-left p").eq(3).html("&nbsp;" + result.data.coins);
			$(".box-left p").eq(4).html("&nbsp;" + result.data.medikit_num);
			$(".box-left p").eq(5).html("&nbsp;" + result.data.fodder_num);
		}
	});		
			
}

function collectEgg() {
	$.ajax({
		url: 'http://farmapi.niowoo.cn/api/interaction/hen',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			action: 'cure'
		},
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
				setTimeout(function(){
					$('.popup').css('display','none');
			},3000);
		}
	});	
}

function sweep() {
	$.ajax({
		url: 'http://farmapi.niowoo.cn/api/interaction/hen',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			action: 'sweep'
		},
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
				setTimeout(function(){
					$('.popup').css('display','none');
			},3000);
		}
	});	
}



$(function(){
	//显示排行榜
	$('.toranking').on('click',function(){
		$('.mark').css('display','block');
		$('.ranking').css('display','block');
	});
	//关闭排行榜
	$('.r-close').on('click',function(){
		$('.mark').css('display','none');
		$('.ranking').css('display','none');
	});
	$('.r-sure').on('click',function(){
		$('.mark').css('display','none');
		$('.ranking').css('display','none');
	});
	
	//显示商店
	$('.shop').on('click',function(){
		$('.mark').css('display','block');
		$('.m-shop').css('display','block');
	});
	//关闭商店
	$('.s-close').on('click',function(){
		$('.mark').css('display','none');
		$('.ranking').css('display','none');
	});
	$('.i-buy').on('click',function(){
		var data = {};
		if($(this) === $('.i-buy').eq(0)[0]) {
			data = {
				medikit: 1
			}
		}
		if($(this) === $('.i-buy').eq(1)[0]) {
			data = {
				fodder: 1
			}
		}
		if($(this) === $('.i-buy').eq(2)[0]) {
			data = {
				adventure_kit: 1
			}
		}

		$.ajax({
			url: 'http://farmapi.niowoo.cn/api/shop/props',
			type: 'GET',
			dataType: 'jsonp',
			data: data,
			success: function(result) {
				if(result.status_code === 0) {
					$('.s-success').css('display','block');
					setTimeout(function(){
						$('.s-success').css('display','none');
					},3000);
				}else {
					$('.s-error').css('display','block');
					setTimeout(function(){
						$('.s-error').css('display','none');
					},3000);
				}
			},
			error: function() {
				$('.s-error').css('display','block');
					setTimeout(function(){
					$('.s-error').css('display','none');
				},3000);
			}
		});

	});

	// 商店道具购买
	$(".s-sure").on("click", function() {
		$('.mark').css('display','none');
		$('.ranking').css('display','none');
	})
	
});


////获取非行间样式
//function getStyle(obj, attr) {
//	if(obj.currentStyle) {
//		return obj.currentStyle[attr];
//	} else {
//		return getComputedStyle(obj, false)[attr];
//	}
//}
//
////为对象写入/获取css样式
//function css(obj, attr, value) { //对象，样式，值。传2个参数的时候为获取样式，3个是设置样式
//	if(arguments.length == 2) { //arguments参数数组，当参数数组长度为2时表示获取css样式
//		return getStyle(obj, attr); //返回对象的非行间样式用上面的getStyle函数
//	} else {
//		if(arguments.length == 3) { //当传三个参数的时候为设置对象的某个值
//			obj.style[attr] = value;
//		};
//	};
//};
//
//var imgs = document.querySelectorAll('.runs img');
//console.log(imgs);
//for(var i = 0; i < imgs.length; i++) {
//	//	var img = imgs[i];
//	var left = getStyle(imgs[i], 'left');
//	var top = getStyle(imgs[i], 'top');
//	console.log(left);
//	//console.log(left);
//	//console.log(top)
//	if(left == '0px') {
//		imgs[i].className = 'toright';
//		//		imgs[1].className = 'toright';
//		//		imgs[2].className = 'toright';
////		console.log(imgs[0].className);
//	}
//}
//var anim = CSSAnimations.get('toRight');
//var anim1 = CSSAnimations.get('toTop');
//var newLeft = anim.keyframes[0].css.left;
//var newTop = anim1.keyframes[1].css.top;
//var rem4 = '4rem';
//var rem0 = '0';
//
//// console.log(newTop)
//imgs[0].addEventListener("webkitAnimationEnd", function() {
//
//	if(imgs[0].className == 'toright') {
//		imgs[0].style.left = rem4;
//		imgs[0].style.top = rem0;
//		imgs[0].className = 'tobottom';
//		console.log(imgs[0].className);
//		imgs[0].src = 'img/home/chook01.png';
//	} else if(imgs[0].className == 'tobottom') {
//		imgs[0].style.left = rem4;
//		imgs[0].style.top = rem4;
//		imgs[0].className = 'toleft';
//		imgs[0].src = 'img/home/chook01.png'
//	} else if(imgs[0].className == 'toleft') {
//		imgs[0].style.left = rem0;
//		imgs[0].style.top = rem4;
//		imgs[0].className = 'totop';
//		imgs[0].src = 'img/home/chook04.png'
//	} else if(imgs[0].className == 'totop') {
//		imgs[0].style.left = rem0;
//		imgs[0].style.top = rem0;
//		imgs[0].className = 'toright';
//		imgs[0].src = 'img/home/chook04.png'
//	}
//});
//imgs[1].addEventListener("webkitAnimationEnd", function() {
//
//	if(imgs[1].className == 'toright') {
//		imgs[1].style.left = rem4;
//		imgs[1].style.top = rem0;
//		imgs[1].style.animationDelay = '1.5s';
//		imgs[1].className = 'tobottom';
//		imgs[1].src = 'img/home/chook01.png';
//	} else if(imgs[1].className == 'tobottom') {
//		imgs[1].style.animationDelay = '0.5s';
//		imgs[1].style.left = rem4;
//		imgs[1].style.top = rem4;
//		imgs[1].className = 'toleft';
//		imgs[1].src = 'img/home/chook01.png'
//	} else if(imgs[1].className == 'toleft') {
//		imgs[1].style.left = rem0;
//		imgs[1].style.top = rem4;
//		imgs[1].className = 'totop';
//		imgs[1].src = 'img/home/chook04.png'
//	} else if(imgs[1].className == 'totop') {
//		imgs[1].style.left = rem0;
//		imgs[1].style.top = rem0;
//		imgs[1].className = 'toright';
//		imgs[1].src = 'img/home/chook04.png'
//	}
//});
//imgs[2].addEventListener("webkitAnimationEnd", function() {
//
//	if(imgs[2].className == 'toright') {
//		imgs[2].style.left = rem4;
//		imgs[2].style.top = rem0;
//		imgs[2].style.animationDelay = '1s';
//		imgs[2].className = 'tobottom';
//		imgs[2].src = 'img/home/chook01.png';
//	} else if(imgs[2].className == 'tobottom') {
//		imgs[2].style.left = rem4;
//		imgs[2].style.top = rem4;
//		imgs[2].className = 'toleft';
//		imgs[2].src = 'img/home/chook01.png'
//	} else if(imgs[2].className == 'toleft') {
//		imgs[2].style.left = rem0;
//		imgs[2].style.top = rem4;
//		imgs[2].className = 'totop';
//		imgs[2].src = 'img/home/chook04.png'
//	} else if(imgs[2].className == 'totop') {
//		imgs[2].style.left = rem0;
//		imgs[2].style.top = rem0;
//		imgs[2].className = 'toright';
//		imgs[2].src = 'img/home/chook04.png'
//	}
//});
//imgs[3].addEventListener("webkitAnimationEnd", function() {
//
//	if(imgs[3].className == 'toright') {
//		imgs[3].style.left = rem4;
//		imgs[3].style.top = rem0;
//		imgs[3].style.animationDelay = '2.2s';
//		imgs[3].className = 'tobottom';
//		imgs[3].src = 'img/home/chook01.png';
//	} else if(imgs[3].className == 'tobottom') {
//		imgs[3].style.left = rem4;
//		imgs[3].style.top = rem4;
//		imgs[3].className = 'toleft';
//		imgs[3].src = 'img/home/chook01.png'
//	} else if(imgs[3].className == 'toleft') {
//		imgs[3].style.left = rem0;
//		imgs[3].style.top = rem4;
//		imgs[3].className = 'totop';
//		imgs[3].src = 'img/home/chook04.png'
//	} else if(imgs[3].className == 'totop') {
//		imgs[3].style.left = rem0;
//		imgs[3].style.top = rem0;
//		imgs[3].className = 'toright';
//		imgs[3].src = 'img/home/chook04.png'
//	}
//});
//imgs[4].addEventListener("webkitAnimationEnd", function() {
//
//	if(imgs[4].className == 'toright') {
//		imgs[4].style.left = rem4;
//		imgs[4].style.top = rem0;
//		imgs[4].style.animationDelay = '0.8s';
//		imgs[4].className = 'tobottom';
//		imgs[4].src = 'img/home/chook01.png';
//	} else if(imgs[4].className == 'tobottom') {
//		imgs[4].style.left = rem4;
//		imgs[4].style.top = rem4;
//		imgs[4].className = 'toleft';
//		imgs[4].src = 'img/home/chook01.png'
//	} else if(imgs[4].className == 'toleft') {
//		imgs[4].style.left = rem0;
//		imgs[4].style.top = rem4;
//		imgs[4].className = 'totop';
//		imgs[4].src = 'img/home/chook04.png'
//	} else if(imgs[4].className == 'totop') {
//		imgs[4].style.left = rem0;
//		imgs[4].style.top = rem0;
//		imgs[4].className = 'toright';
//		imgs[4].src = 'img/home/chook04.png'
//	}
//});
//imgs[5].addEventListener("webkitAnimationEnd", function() {
//
//	if(imgs[5].className == 'toright') {
//		imgs[5].style.left = rem4;
//		imgs[5].style.top = rem0;
//		imgs[5].style.animationDelay = '2s';
//		imgs[5].className = 'tobottom';
//		imgs[5].src = 'img/home/chook01.png';
//	} else if(imgs[5].className == 'tobottom') {
//		imgs[5].style.left = rem4;
//		imgs[5].style.top = rem4;
//		imgs[5].className = 'toleft';
//		imgs[5].src = 'img/home/chook01.png'
//	} else if(imgs[5].className == 'toleft') {
//		imgs[5].style.left = rem0;
//		imgs[5].style.top = rem4;
//		imgs[5].className = 'totop';
//		imgs[5].src = 'img/home/chook04.png'
//	} else if(imgs[5].className == 'totop') {
//		imgs[5].style.left = rem0;
//		imgs[5].style.top = rem0;
//		imgs[5].className = 'toright';
//		imgs[5].src = 'img/home/chook04.png'
//	}
//});
//imgs[6].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[6].className == 'toright') {
//		imgs[6].style.left = rem4;
//		imgs[6].style.top = rem0;
//		imgs[6].style.animationDelay = '3.5s';
//		imgs[6].className = 'tobottom';
//		imgs[6].src = 'img/home/chook01.png';
//	} else if(imgs[6].className == 'tobottom') {
//		imgs[6].style.left = rem4;
//		imgs[6].style.top = rem4;
//		imgs[6].className = 'toleft';
//		imgs[6].src = 'img/home/chook01.png'
//	} else if(imgs[6].className == 'toleft') {
//		imgs[6].style.left = rem0;
//		imgs[6].style.top = rem4;
//		imgs[6].className = 'totop';
//		imgs[6].src = 'img/home/chook04.png'
//	} else if(imgs[6].className == 'totop') {
//		imgs[6].style.left = rem0;
//		imgs[6].style.top = rem0;
//		imgs[6].className = 'toright';
//		imgs[6].src = 'img/home/chook04.png'
//	}
//});
//imgs[7].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[7].className == 'toright') {
//		imgs[7].style.left = rem4;
//		imgs[7].style.top = rem0;
//		imgs[7].style.animationDelay = '2.5s';
//		imgs[7].className = 'tobottom';
//		imgs[7].src = 'img/home/chook01.png';
//	} else if(imgs[7].className == 'tobottom') {
//		imgs[7].style.left = rem4;
//		imgs[7].style.top = rem4;
//		imgs[7].className = 'toleft';
//		imgs[7].src = 'img/home/chook01.png'
//	} else if(imgs[7].className == 'toleft') {
//		imgs[7].style.left = rem0;
//		imgs[7].style.top = rem4;
//		imgs[7].className = 'totop';
//		imgs[7].src = 'img/home/chook04.png'
//	} else if(imgs[7].className == 'totop') {
//		imgs[7].style.left = rem0;
//		imgs[7].style.top = rem0;
//		imgs[7].className = 'toright';
//		imgs[7].src = 'img/home/chook04.png'
//	}
//});
//imgs[8].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[8].className == 'toright') {
//		imgs[8].style.left = rem4;
//		imgs[8].style.top = rem0;
//		imgs[8].style.animationDelay = '1.8s';
//		imgs[8].className = 'tobottom';
//		imgs[8].src = 'img/home/chook01.png';
//	} else if(imgs[8].className == 'tobottom') {
//		imgs[8].style.left = rem4;
//		imgs[8].style.top = rem4;
//		imgs[8].className = 'toleft';
//		imgs[8].src = 'img/home/chook01.png'
//	} else if(imgs[8].className == 'toleft') {
//		imgs[8].style.left = rem0;
//		imgs[8].style.top = rem4;
//		imgs[8].className = 'totop';
//		imgs[8].src = 'img/home/chook04.png'
//	} else if(imgs[8].className == 'totop') {
//		imgs[8].style.left = rem0;
//		imgs[8].style.top = rem0;
//		imgs[8].className = 'toright';
//		imgs[8].src = 'img/home/chook04.png'
//	}
//});
//imgs[9].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[9].className == 'toright') {
//		imgs[9].style.left = rem4;
//		imgs[9].style.top = rem0;
//		imgs[9].style.animationDelay = '1.2s';
//		imgs[9].className = 'tobottom';
//		imgs[9].src = 'img/home/chook01.png';
//	} else if(imgs[9].className == 'tobottom') {
//		imgs[9].style.left = rem4;
//		imgs[9].style.top = rem4;
//		imgs[9].className = 'toleft';
//		imgs[9].src = 'img/home/chook01.png'
//	} else if(imgs[9].className == 'toleft') {
//		imgs[9].style.left = rem0;
//		imgs[9].style.top = rem4;
//		imgs[9].className = 'totop';
//		imgs[9].src = 'img/home/chook04.png'
//	} else if(imgs[9].className == 'totop') {
//		imgs[9].style.left = rem0;
//		imgs[9].style.top = rem0;
//		imgs[9].className = 'toright';
//		imgs[9].src = 'img/home/chook04.png'
//	}
//});
//imgs[10].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[10].className == 'toright') {
//		imgs[10].style.left = rem4;
//		imgs[10].style.top = rem0;
//		imgs[10].style.animationDelay = '0.8s';
//		imgs[10].className = 'tobottom';
//		imgs[10].src = 'img/home/chook01.png';
//	} else if(imgs[10].className == 'tobottom') {
//		imgs[10].style.left = rem4;
//		imgs[10].style.top = rem4;
//		imgs[10].className = 'toleft';
//		imgs[10].src = 'img/home/chook01.png'
//	} else if(imgs[10].className == 'toleft') {
//		imgs[10].style.left = rem0;
//		imgs[10].style.top = rem4;
//		imgs[10].className = 'totop';
//		imgs[10].src = 'img/home/chook04.png'
//	} else if(imgs[10].className == 'totop') {
//		imgs[10].style.left = rem0;
//		imgs[10].style.top = rem0;
//		imgs[10].className = 'toright';
//		imgs[10].src = 'img/home/chook04.png'
//	}
//});
//imgs[11].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[11].className == 'toright') {
//		imgs[11].style.left = rem4;
//		imgs[11].style.top = rem0;
//		imgs[11].style.animationDelay = '1.3s';
//		imgs[11].className = 'tobottom';
//		imgs[11].src = 'img/home/chook01.png';
//	} else if(imgs[11].className == 'tobottom') {
//		imgs[11].style.left = rem4;
//		imgs[11].style.top = rem4;
//		imgs[11].className = 'toleft';
//		imgs[11].src = 'img/home/chook01.png'
//	} else if(imgs[11].className == 'toleft') {
//		imgs[11].style.left = rem0;
//		imgs[11].style.top = rem4;
//		imgs[11].className = 'totop';
//		imgs[11].src = 'img/home/chook04.png'
//	} else if(imgs[11].className == 'totop') {
//		imgs[11].style.left = rem0;
//		imgs[11].style.top = rem0;
//		imgs[11].className = 'toright';
//		imgs[11].src = 'img/home/chook04.png'
//	}
//});
//imgs[12].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[12].className == 'toright') {
//		imgs[12].style.left = rem4;
//		imgs[12].style.top = rem0;
//		imgs[12].style.animationDelay = '1.1s';
//		imgs[12].className = 'tobottom';
//		imgs[12].src = 'img/home/chook01.png';
//	} else if(imgs[12].className == 'tobottom') {
//		imgs[12].style.left = rem4;
//		imgs[12].style.top = rem4;
//		imgs[12].className = 'toleft';
//		imgs[12].src = 'img/home/chook01.png'
//	} else if(imgs[12].className == 'toleft') {
//		imgs[12].style.left = rem0;
//		imgs[12].style.top = rem4;
//		imgs[12].className = 'totop';
//		imgs[12].src = 'img/home/chook04.png'
//	} else if(imgs[12].className == 'totop') {
//		imgs[12].style.left = rem0;
//		imgs[12].style.top = rem0;
//		imgs[12].className = 'toright';
//		imgs[12].src = 'img/home/chook04.png'
//	}
//});
//imgs[13].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[13].className == 'toright') {
//		imgs[13].style.left = rem4;
//		imgs[13].style.top = rem0;
//		imgs[13].style.animationDelay = '0.5s';
//		imgs[13].className = 'tobottom';
//		imgs[13].src = 'img/home/chook01.png';
//	} else if(imgs[13].className == 'tobottom') {
//		imgs[13].style.left = rem4;
//		imgs[13].style.top = rem4;
//		imgs[13].className = 'toleft';
//		imgs[13].src = 'img/home/chook01.png'
//	} else if(imgs[13].className == 'toleft') {
//		imgs[13].style.left = rem0;
//		imgs[13].style.top = rem4;
//		imgs[13].className = 'totop';
//		imgs[13].src = 'img/home/chook04.png'
//	} else if(imgs[13].className == 'totop') {
//		imgs[13].style.left = rem0;
//		imgs[13].style.top = rem0;
//		imgs[13].className = 'toright';
//		imgs[13].src = 'img/home/chook04.png'
//	}
//});
//imgs[14].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[14].className == 'toright') {
//		imgs[14].style.left = rem4;
//		imgs[14].style.top = rem0;
//		imgs[14].style.animationDelay = '0.6s';
//		imgs[14].className = 'tobottom';
//		imgs[14].src = 'img/home/chook01.png';
//	} else if(imgs[14].className == 'tobottom') {
//		imgs[14].style.left = rem4;
//		imgs[14].style.top = rem4;
//		imgs[14].className = 'toleft';
//		imgs[14].src = 'img/home/chook01.png'
//	} else if(imgs[14].className == 'toleft') {
//		imgs[14].style.left = rem0;
//		imgs[14].style.top = rem4;
//		imgs[14].className = 'totop';
//		imgs[14].src = 'img/home/chook04.png'
//	} else if(imgs[14].className == 'totop') {
//		imgs[14].style.left = rem0;
//		imgs[14].style.top = rem0;
//		imgs[14].className = 'toright';
//		imgs[14].src = 'img/home/chook04.png'
//	}
//});
//imgs[15].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[15].className == 'toright') {
//		imgs[15].style.left = rem4;
//		imgs[15].style.top = rem0;
//		imgs[15].style.animationDelay = '1.7s';
//		imgs[15].className = 'tobottom';
//		imgs[15].src = 'img/home/chook01.png';
//	} else if(imgs[15].className == 'tobottom') {
//		imgs[15].style.left = rem4;
//		imgs[15].style.top = rem4;
//		imgs[15].className = 'toleft';
//		imgs[15].src = 'img/home/chook01.png'
//	} else if(imgs[15].className == 'toleft') {
//		imgs[15].style.left = rem0;
//		imgs[15].style.top = rem4;
//		imgs[15].className = 'totop';
//		imgs[15].src = 'img/home/chook04.png'
//	} else if(imgs[15].className == 'totop') {
//		imgs[15].style.left = rem0;
//		imgs[15].style.top = rem0;
//		imgs[15].className = 'toright';
//		imgs[15].src = 'img/home/chook04.png'
//	}
//});
//imgs[16].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[16].className == 'toright') {
//		imgs[16].style.left = rem4;
//		imgs[16].style.top = rem0;
//		imgs[16].style.animationDelay = '1.3s';
//		imgs[16].className = 'tobottom';
//		imgs[16].src = 'img/home/chook01.png';
//	} else if(imgs[16].className == 'tobottom') {
//		imgs[16].style.left = rem4;
//		imgs[16].style.top = rem4;
//		imgs[16].className = 'toleft';
//		imgs[16].src = 'img/home/chook01.png'
//	} else if(imgs[16].className == 'toleft') {
//		imgs[16].style.left = rem0;
//		imgs[16].style.top = rem4;
//		imgs[16].className = 'totop';
//		imgs[16].src = 'img/home/chook04.png'
//	} else if(imgs[16].className == 'totop') {
//		imgs[16].style.left = rem0;
//		imgs[16].style.top = rem0;
//		imgs[16].className = 'toright';
//		imgs[16].src = 'img/home/chook04.png'
//	}
//});
//
//imgs[17].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[17].className == 'toright') {
//		imgs[17].style.left = rem4;
//		imgs[17].style.top = rem0;
//		imgs[17].style.animationDelay = '0.4s';
//		imgs[17].className = 'tobottom';
//		imgs[17].src = 'img/home/chook01.png';
//	} else if(imgs[17].className == 'tobottom') {
//		imgs[17].style.left = rem4;
//		imgs[17].style.top = rem4;
//		imgs[17].className = 'toleft';
//		imgs[17].src = 'img/home/chook01.png'
//	} else if(imgs[17].className == 'toleft') {
//		imgs[17].style.left = rem0;
//		imgs[17].style.top = rem4;
//		imgs[17].className = 'totop';
//		imgs[17].src = 'img/home/chook04.png'
//	} else if(imgs[17].className == 'totop') {
//		imgs[17].style.left = rem0;
//		imgs[17].style.top = rem0;
//		imgs[17].className = 'toright';
//		imgs[17].src = 'img/home/chook04.png'
//	}
//});
//
//imgs[18].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[18].className == 'toright') {
//		imgs[18].style.left = rem4;
//		imgs[18].style.top = rem0;
//		imgs[18].style.animationDelay = '3.2s';
//		imgs[18].className = 'tobottom';
//		imgs[18].src = 'img/home/chook01.png';
//	} else if(imgs[18].className == 'tobottom') {
//		imgs[18].style.left = rem4;
//		imgs[18].style.top = rem4;
//		imgs[18].className = 'toleft';
//		imgs[18].src = 'img/home/chook01.png'
//	} else if(imgs[18].className == 'toleft') {
//		imgs[18].style.left = rem0;
//		imgs[18].style.top = rem4;
//		imgs[18].className = 'totop';
//		imgs[18].src = 'img/home/chook04.png'
//	} else if(imgs[18].className == 'totop') {
//		imgs[18].style.left = rem0;
//		imgs[18].style.top = rem0;
//		imgs[18].className = 'toright';
//		imgs[18].src = 'img/home/chook04.png'
//	}
//});
//imgs[19].addEventListener("webkitAnimationEnd", function() {
//	if(imgs[19].className == 'toright') {
//		imgs[19].style.left = rem4;
//		imgs[19].style.top = rem0;
//		imgs[19].style.animationDelay = '4s';
//		imgs[19].className = 'tobottom';
//		imgs[19].src = 'img/home/chook01.png';
//	} else if(imgs[19].className == 'tobottom') {
//		imgs[19].style.left = rem4;
//		imgs[19].style.top = rem4;
//		imgs[19].className = 'toleft';
//		imgs[19].src = 'img/home/chook01.png'
//	} else if(imgs[19].className == 'toleft') {
//		imgs[19].style.left = rem0;
//		imgs[19].style.top = rem4;
//		imgs[19].className = 'totop';
//		imgs[19].src = 'img/home/chook04.png'
//	} else if(imgs[19].className == 'totop') {
//		imgs[19].style.left = rem0;
//		imgs[19].style.top = rem0;
//		imgs[19].className = 'toright';
//		imgs[19].src = 'img/home/chook04.png'
//	}
//});
//
////}
////setInterval(function(){		
////	var arr = []
////	var num1 = Math.random() * 12;	
////	var num2 = Math.random() * 6;	
////	var anim1 = CSSAnimations.create({
////		'0%': {
////			'left': newLeft+'',
////			'top':newTop + ''
////		},
////		'100%': {
////			'left': num1 + 'rem',
////			'top':num2 + 'rem'
////		}
////
////	});	
////	var anim = CSSAnimations.get(anim1.name);	
////	if(num1>6){
////		img.style.animationDuration = '10s';
////	}else{
////		img.style.animationDuration = '5s';
////	}
////	img.style.animationName = anim1.name;
////	var newLeft = anim.keyframes[1].css.left;
////	var newTop = anim1.keyframes[1].css.top;	
////	console.log(newTop);
//},10000)