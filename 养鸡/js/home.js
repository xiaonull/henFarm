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




function Chicken(id) {
	this.cla = '.runs .run' + id;
	this.timer = null;
	$(this.cla).css({
		"bottom": Math.random() * 100 + '%',
		"left": Math.random() * 90 + '%'
	});
}

Chicken.prototype.move = function() {
	$(this.cla).css({
		"bottom": Math.random() * 100 + '%',
		"left": Math.random() * 90 + '%'
	});
	this.timer = setInterval(function() {
		var position = isRandomPosition();


		$(this.cla).animate(position, {
			speed: 100,
			easing: 'swing'
		});

	}.bind(this), 500);
}

// function isRandomPosition() {
// 	var n = Math.floor(Math.random() * 2 + 1);
// 	if(n === 1) {
// 		return {
// 			"top":  isRandomPlus() + Math.random() * 100 + '%'
// 		};
// 	}else if(n === 2) {
// 		return {
// 			"left":  isRandomPlus() + Math.random() * 100 + '%'
// 		};
// 	}

// }

function isRandomPosition() {
	var n = Math.floor(Math.random() * 2 + 1);
	if(n === 1) {
		return {
			"bottom":  isRandomPlus() + '=' + '40px'
		};
	}else if(n === 2) {
		return {
			"left":  isRandomPlus() + '=' + '40px'
		};
	}
	
}

function isRandomPlus() {
	var n = Math.floor(Math.random() * 2 + 1);
	if(n > 1) {
		return '+';
	}else {
		return '-';
	}
}

// 显示交易
$(".tradingcenter").on('click', function() {
	$('.mark').css('display','block');
	$('.mark .transactionPannel').css('display','block');
	
	loadtransactionsList();
});

function loadtransactionsList() {
	var option = {
		url: 'api/transactions/get',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			console.log(result);
			$('.transactionTab .saleList-pannel').html('');
			var list = result.data;
			for(var i = 0, j = list.length; i < j; i++) {
				var templ = '';
				templ += '<div class="saleList-item clearfix">';
				templ += 	'<div class="item-l">';
				templ += 		'<p><span class="name">' + list[i].goods[0].name + '：</span><span class="num">' + list[i].goods[0].num + '</span>';
				templ += 			'<span class="priceContainer">';
				templ += 				'<span class="priceText">单价：</span>';
				templ += 				'<span class="price">' + list[i].goods[0].coin + '</span>';
				templ += 			'</span>';
				templ += 		'</p>';
				templ += 		'<p>委托人：<span class="personName">' + list[i].seller + '</span></p>';
				templ += 		'<p>联系方式：<span class="phone">' + list[i].goods[0].phone + '</span></p>';
				templ += 		'<p>委托时间：<span class="time">' + list[i].time + '</span></p>';
				templ += 	'</div>';
				templ += 	'<div class="item-r">';
				templ += 		'<span class="transactionId">' + list[i].id + '</span>';
				templ += 		'<button class="saleList-pannel-buy">购买</button>';
				templ += 	'</div>';
				templ += '</div>';

				$('.transactionTab .saleList-pannel').append(templ);
			}				
		}
	}

	myAjax(option);
}

$('.transactionPannel .saleList').on('click', function() {
	loadtransactionsList();
});

$('.transactionPannel .agencyTransaction-pannel .eggRadio').on('click', function() {
	var option = {
		url: 'api/henyard/profile',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			$('.agencyTransaction-pannel .eggNum input').val(result.data.profile.egg);
			$('.agencyTransaction-pannel .saleEggNum input').val(result.data.profile.egg);
		}
	}

	myAjax(option);
});

$('.transactionPannel .agencyTransaction-pannel .goldEggRadio').on('click', function() {
	var option = {
		url: 'api/henyard/profile',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			$('.agencyTransaction-pannel .eggNum input').val(result.data.profile.golden_egg);
			$('.agencyTransaction-pannel .saleEggNum input').val(result.data.profile.golden_egg);
		}
	}

	myAjax(option);
});

$('.transactionPannel .agencyTransaction-pannel .sure').on('click', function() {
	var henEgg = $('.transactionPannel .agencyTransaction-pannel input:radio[name="henEgg"]:checked').val();
	var saleEgg = $('.transactionPannel .agencyTransaction-pannel .saleEggNum input').val();
	var price = $('.transactionPannel .agencyTransaction-pannel .price input').val();
	var phone = $('.transactionPannel .agencyTransaction-pannel .phone input').val();
	var pas = $('.transactionPannel .agencyTransaction-pannel .transactionPass input').val();
	if(henEgg !== 'egg' && henEgg !== 'golden_egg') {
		$('.popup').text('请选择哪种鸡蛋！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	if(saleEgg <= 0 || saleEgg === null || saleEgg === '') {
		$('.popup').text('请正确填写可售鸡蛋！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	if(price === null || price === '') {
		$('.popup').text('请输入单个价格！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	if(phone === null || phone === '') {
		$('.popup').text('请输入手机号码！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	if(pas === null || pas === '') {
		$('.popup').text('请输入交易密码！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	var goods = {};
	if(henEgg === 'egg') {
		goods = {
			egg: saleEgg
		};
	}
	if(henEgg === 'golden_egg') {
		goods = {
			golden_egg: saleEgg
		};
	}

	var option = {
		url: 'api/transactions/create',
		type: 'POST',
		data: {
			coin: price,
			phone: phone,
			goods: goods,
			pin: pas
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
			},3000);	
		}
	}

	myAjax(option);

});


$('.transactionPannel .saleList-pannel').on('click', function(e) {
	// console.log($(e.target)[0].className);
	if($(e.target)[0].className !== 'saleList-pannel-buy') {
		return;
	}

	var transactionId = -1;

	var list = $('.transactionTab .saleList-pannel .saleList-item');
	for(var i = 0, j = list.length; i < j; i++) {
		if($(e.target)[0] === $('.transactionTab .saleList-pannel .saleList-item .saleList-pannel-buy').eq(i)[0]) {
			transactionId = $('.transactionTab .saleList-pannel .saleList-item .saleList-pannel-buy').eq(i).parent().find('.transactionId').text() * 1;
			break;
		}
	}
	// alert(transactionId);
	var option = {
		url: 'api/transactions/buy',
		type: 'POST',
		data: {
			id: transactionId
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			console.log(result);
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
			},3000);	
		}
	}

	myAjax(option);

});

// 鸡蛋转赠
$('.transactionPannel .giveEgg-pannel .sure').on('click', function(event) {
	event.preventDefault();
	var userId = $('.giveEgg-pannel .userId').val();
	var henEgg = $('.giveEgg-pannel .eggRadio input:radio[name="henEgg"]:checked').val();
	var eggNum = $('.giveEgg-pannel .eggNum').val();
	var transactionPsw = $('.giveEgg-pannel .transactionPsw').val();
	if(userId === '' || userId === null) {
		$('.popup').text('请输入玩家ID！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	if(henEgg !== 'egg' && henEgg !== 'golden_egg') {
		$('.popup').text('请选择哪种鸡蛋！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	if(eggNum === '' || eggNum === null) {
		$('.popup').text('请输入鸡蛋数量！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}
	if(transactionPsw === '' || eggNum === null) {
		$('.popup').text('请输入交易密码！');
		$('.popup').css('display','block');
		setTimeout(function(){
			$('.popup').css('display','none');
		},3000);
		return;
	}

	var option = {
		url: 'api/transactions/eggs',
		type: 'POST',
		data: {
			identity: henEgg,
			num: eggNum,
			pin: transactionPsw,
			target: userId
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
			},3000);
		}
	}

	myAjax(option);


});

$(".transactionTab ul li").on("click", function() {
	$(".transactionTab ul li").removeClass("active");
	$(this).addClass("active");
	var index = -1;
	for(var i = 0, j = $(".transactionTab ul li").length; i < j; i++) {
		if(this === $(".transactionTab ul li").eq(i)[0]) {
			index = i;
			break;
		}
	}

	switchPanel(index);

});

function switchPanel(index) {
	$(".transactionTab section.active").removeClass("active");
	$(".transactionTab section.pannel").eq(index).addClass("active");
} 



// 关闭交易
$('.transactionPannel .s-close').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .transactionPannel').css('display','none');
});


// 显示仓库
$(".warehouse").on('click', function() {
	$('.mark').css('display','block');
	$('.mark .warehousePannel').css('display','block');

	var option = {
		url: 'api/henyard/profile',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			$('.warehousePannel .item').eq(0).find('.i-num span').eq(1).text(result.data.profile.medikit); 
			$('.warehousePannel .item').eq(1).find('.i-num span').eq(1).text(result.data.profile.fodder); 
			$('.warehousePannel .item').eq(2).find('.i-num span').eq(1).text(result.data.profile.adventure_kit); 
			$('.warehousePannel .item').eq(3).find('.i-num span').eq(1).text(result.data.profile.egg); 
			$('.warehousePannel .item').eq(4).find('.i-num span').eq(1).text(result.data.profile.golden_egg); 
			$('.warehousePannel .item').eq(5).find('.i-num span').eq(1).text(result.data.profile.wild_goose_egg); 
			$('.warehousePannel .item').eq(6).find('.i-num span').eq(1).text(result.data.profile.peacock_egg); 
			// console.log(result);
		}
	}

	myAjax(option);

});
// 关闭仓库
$('.warehousePannel .s-close').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .warehousePannel').css('display','none');
});
$('.warehousePannel .s-sure').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .warehousePannel').css('display','none');
});

// 显示兑换
$(".exchange").on('click', function(e) {

	$('.mark').css('display','block');
	$('.mark .exchangePannel').css('display','block');

	var option = {
		url: 'api/henyard/eggs2coins/getrates',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			console.log(result);
			if(result.data.egg.current) {
				$('.exchangePannel .exchangeTable-eggPrice').text(result.data.egg.current);
			}
			if(result.data.golden_egg.current) {
				$('.exchangePannel .exchangeTable-goldEggprice').text(result.data.golden_egg.current);
			}	
			if(result.data.wild_goose_egg.current) {
				$('.exchangePannel .exchangeTable-gooseEggPrice').text(result.data.wild_goose_egg.current);
			}
			if(result.data.peacock_egg.current) {
				$('.exchangePannel .exchangeTable-peacockEggPrice').text(result.data.peacock_egg.current);
			}			
		}
	}

	myAjax(option);

});
// 显示往期价格
$('.exchangeTable-openEgg').on('click', function(e) {
	// $('.popupOldPrice').fadeIn();
	e.stopPropagation();

	showOldPrice('egg');

});
$('.exchangeTable-openGoldEgg').on('click', function(e) {
	// $('.popupOldPrice').fadeIn();
	e.stopPropagation();

	showOldPrice('golden_egg');

});
$('.exchangeTable-openGooseEgg').on('click', function(e) {
	// $('.popupOldPrice').fadeIn();
	e.stopPropagation();

	showOldPrice('wild_goose_egg');

});
$('.exchangeTable-openPeacockEgg').on('click', function(e) {
	// $('.popupOldPrice').fadeIn();
	e.stopPropagation();

	showOldPrice('peacock_egg');

});

function showOldPrice(type) {
	var option = {
		url: 'api/henyard/eggs2coins/getrates',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			// console.log(result.data);
			if(result.data[type].length === 0) {
				$('.popup').text('没有往期价格');
				$('.popup').css('display','block');
				setTimeout(function(){
					$('.popup').css('display','none');
				},3000);
				return;
			}

			var list = result.data[type].history;
			$('.popupOldPrice').fadeIn();
			$('.popupOldPrice ul').html('');
			for(var i = 0, j = list.length; i < j; i++) {
				var teml = '';
				teml += '<li>';
				teml += 	'<span class="time">' + list[i][0].time + '</span>';
				teml += 	'<span class="oldPrice">' + list[i][0].rate + '</span>';
				teml += '</li>';

				$('.popupOldPrice ul').append(teml);
			}
		}
	}
	
	myAjax(option);
}

// 点击兑换
$('.exchangePannel .exchangeEgg').on('click', function() {
	exchangeButton('egg');
});
$('.exchangePannel .exchangeGoldEgg').on('click', function() {
	exchangeButton('golden_egg');
});
$('.exchangePannel .exchangeGooseEgg').on('click', function() {
	exchangeButton('wild_goose_egg');
});
$('.exchangePannel .exchangePeacockEgg').on('click', function() {
	exchangeButton('peacock_egg');
});

function exchangeButton(identity) {
	var option = {
		url: 'api/henyard/eggs2coins',
		type: 'POST',
		data: {
			identity: identity,
			num: 1
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
			},2000);
		}
	}
	
	myAjax(option);
}


// 关闭弹窗
$('.popupOldPrice').on('click', function(e) {
	e.stopPropagation();
});
$('body').on('click', function(e) {
	// e.preventDefault();
	$('.popupOldPrice').fadeOut();
});

// 关闭兑换
$('.exchangePannel .s-close').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .exchangePannel').css('display','none');
	window.location.assign("home.html");
});
$('.exchangePannel .s-sure').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .exchangePannel').css('display','none');
	window.location.assign("home.html");
});

// 打开好友
$('.friends').on('click', function() {
	$('.mark').css('display','block');
	$('.mark .friendsPannel').css('display','block');

	var option = {
		url: 'api/personal/friends',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			// console.log(result);
			$('.friendsPannel .sweepNum span').html(result.data.today_sweep_times);

			var lv1List = [];
			var lv2List = [];
			var lv3List = [];
			if(result.data.lv1) {
				lv1List = result.data.lv1;
			}
			if(result.data.lv2) {
				lv2List = result.data.lv2;
			}
			if(result.data.lv3) {
				lv3List = result.data.lv3;
			}
			var friendsList = lv1List.concat(lv2List, lv3List);
			$('.friendsPannel table').html('');
			$('.friendsPannel table').html('<tr><th>好友</th><th><button class="onekeySweepBtn">一键打扫</button></th></tr>');
			for(var i = 0, j = friendsList.length; i < j; i++) {
				var templ = '';
				templ += '<tr>';
				templ += 	'<td class="friengName">' + friendsList[i].name + '</td>';
				templ += 	'<td><button class="sweepForFriend">打扫</button></td>';
				templ += '</tr>';
				$('.friendsPannel table').append(templ);
			}
			
			// 一键打扫
			$('.friendsPannel .onekeySweepBtn').on('click', function(e) {
				e.preventDefault();
				var option = {
					url: 'api/personal/friends/sweepforall',
					beforeSend: function(xhr) {
					},
					complete: function(xhr) {
					},
					success: function(result) {
						$('.popup').text(result.message);
						$('.popup').css('display','block');
						setTimeout(function(){
							$('.popup').css('display','none');
						},3000);

						// 更新打扫次数
						var option = {
							url: 'api/personal/friends',
							beforeSend: function(xhr) {
							},
							complete: function(xhr) {
							},
							success: function(result) {
								$('.friendsPannel .sweepNum span').html(result.data.today_sweep_times);
							}
						};
						myAjax(option);

					}
				}

				myAjax(option);
			});
			// 为好友打扫
			$('.friendsPannel .sweepForFriend').on('click', function(e) {
				$('.popup').text('暂未开放！');
				$('.popup').css('display','block');
				setTimeout(function(){
					$('.popup').css('display','none');
				},3000);
			});

		}
	}

	myAjax(option);
});
// 关闭好友
$('.friendsPannel .s-close').on('click', function(){
	$('.mark').css('display','none');
	$('.mark .friendsPannel').css('display','none');
});
$('.friendsPannel .s-sure').on('click', function(){
	$('.mark').css('display','none');
	$('.mark .friendsPannel').css('display','none');
});

// 显示教程
$(".tutorialImg").on('click', function() {
	$('.mark').css('display','block');
	$('.mark .tutorial').css('display','block');
});

// 关闭教程
$('.tutorial .r-close').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .tutorial').css('display','none');
});
$('.tutorial .r-sure').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .tutorial').css('display','none');
});





window.onload = function() {
	
	showResources();
	
	//轮询公告
	(function() {
		var left = 10;
		var interval1 = setInterval(function() {
			left -= 1;
			$(".notice .noticeText").css({
				left: left + 'px'
			});
		}, 100);
		showNotice();
		var interval2 = setInterval(function() {
			showNotice();
		}, 120000);
	})();

	// 轮询是否喂食
	// showFeedBubble();
	// setInterval(function() {
	// 	showFeedBubble();
	// }, 500000);

	
	
}

// 显示喂食提示气泡框
// function showFeedBubble() {
// 	var option = {
// 		url: 'api/henyard/getpersonalnotices',
// 		beforeSend: function(xhr) {
// 		},
// 		complete: function(xhr) {
// 		},
// 		success: function(result) {
// 			var list = [];
// 			list = result.data.personal_notices;
// 			// console.log(list);
// 			if(list[0] === "") {
// 				$(".feedBubble").css({
// 					display: 'none'
// 				});
// 				return;
// 			}else {
// 				var feedBubbleText = list[0];
// 				$(".feedBubble .feedBubbleText").append(feedBubbleText);
// 				$(".feedBubble").css({
// 					display: 'block'
// 				});
// 			}
// 		}
// 	}
// 	myAjax(option);
// }

// 显示主页面的资源
function showResources() {
	var option = {
		url: 'api/henyard',
		success: function(result, status, xhr) {
			// 头部资源
			// $(".box-left p").eq(0).html("&nbsp;" + result.data.hen_num);
			// $(".box-left p").eq(1).html("&nbsp;" + result.data.egg_num);
			// $(".box-left p").eq(2).html("&nbsp;" + result.data.golden_egg_num);
			// $(".box-left p").eq(3).html("&nbsp;" + result.data.coins);
			// $(".box-left p").eq(4).html("&nbsp;" + result.data.medikit_num);
			// $(".box-left p").eq(5).html("&nbsp;" + result.data.fodder_num);
			
			// 是否显示喂食提示气泡框
			if(result.data.feedable_num > 0) {
				$(".feedBubble .feedBubbleText").text('有 ' + result.data.feedable_num + ' 只鸡可以于今天喂食');
				$(".feedBubble").css({
					display: 'block'
				});
			}
			// else {
			// 	$(".feedBubble .feedBubbleText").text('没有需要喂养的鸡');
			// 	$(".feedBubble").css({
			// 		display: 'block'
			// 	});
			// }

			// console.log(result);

			if(result.data.sweep_chance_num > 0) {
				$('.main .runs').css({
					backgroundImage: 'url("./img/home/waste.png")'
				});
			}else {
				$('.main .runs').css({
					backgroundImage: 'url("")'
				});
			}


			// 页尾资源
			$(".rail-inf .rail-num li").eq(0).append('&nbsp;x&nbsp;<span>' + result.data.hen_num + '</span>');
			$(".rail-inf .rail-num li").eq(1).append('&nbsp;x&nbsp;<span>' + result.data.egg_num + '</span>');
			$(".rail-inf .rail-num li").eq(2).append('&nbsp;x&nbsp;<span>' + result.data.golden_egg_num + '</span>');

			// 显示蛋窝的蛋的图片
			var img = document.createElement("img");
			if(result.data.pickable_egg_num > 0) {
				img.src = "img/home/egg.png";
				$(".footer .egg").append(img);
			}
			
			// 生成鸡群
			var hens = result.data.hen_details;
			// console.log(hens);
			for(var i = 0, j = hens.length; i < j; i++) {
				var img = '';
				var state = '';
				if(hens[i].is_grown === "false") {
					// 生成小鸡
					state = '幼年期';
					var n = Math.floor(Math.random() * 2 + 1);
					if(n === 1) {
						img = '<img class="hen' + i + '" src="img/home/chook01/chooktu01.png" />';
					}else {
						img = '<img class="hen' + i + '" src="img/home/chook02/chooktu01.png" />';
					}
				}else {
					state = '成年期';
					img = '<img class="hen' + i + '" src="img/home/chook03/chooktu01.png" />';
				}

				var time = '-- -- --';

				if(hens[i].time_to_pick.length !== 0) {
					time = hens[i].time_to_pick.hour + ':' + hens[i].time_to_pick.minute + ':' + hens[i].time_to_pick.second;	
				}

				var templ = '';
				templ += '<div class="run run' + hens[i].id + '">';
				templ += 	'<div class="container">';
				templ +=        '<div class="bubble">';
				templ +=        	'<p>' + state + '</p>';
				templ +=        	'<p>' + hens[i].lifetime +'</p>';
				templ +=        	'<p>' + hens[i].is_sick === "false" ? '生病' : '健康' +'</p>';
				templ +=        	'<p class="clock">' + time +'</p>';
				templ +=        '</div>';
				templ += 		img;
				templ += 	'</div>';
				templ += '</div>';

				$(".main .runs").append(templ);
				new Chicken(hens[i].id).move();

				if(hens[i].since_picked.length !== 0) {
					(function(index) {
						henClock(index);
					})(hens[i].id);
				}

				function henClock(i) {
					// 倒计时
					setInterval(function() {
						var runNum = '.run' + i;
						var timeList = $(".main .runs").find(runNum).find(".clock").text().split(':');
						var hour = timeList[0];
						var minute = timeList[1];
						var second = timeList[2];
						second = parseInt(second);
						minute = parseInt(minute);
						hour = parseInt(hour);
						second --;
						if(second === 0){
							minute --;
							second = '59';
						}else if(second < 10) {
							second = '0' + second.toString();
						}

						if(minute === 0) {
							hour --;
							minute = '59';
						}else if(minute < 10) {
							minute = '0' + minute.toString();
						}

						if(hour === 0) {
							hour = '00';
							minute = '00';
							second = '00';
							return;
						}else if(hour < 10) {
							hour = '0' + hour.toString();
						}

						var clock = hour + ':' + minute + ':' + second;
						$(".main .runs").find(runNum).find(".clock").text(clock);
					}, 1000);
				}
			}

			$('.runs .run img').on('click', function(e) {
				var runsList = $('.runs .run img');
				// console.log($(e.target)[0]);
				for(var i = 0, j = runsList.length; i < j; i++) {
					if($(e.target)[0] === $('.runs .run img').eq(i)[0]) {
						$('.runs .run img').eq(i).parent().find('.bubble').css('display', 'block');
						setTimeout(function() {
							$('.runs .run img').eq(i).parent().find('.bubble').css('display', 'none');
						}, 3000);
						return;
					}
				}
			});			
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	};

	myAjax(option);
}

// 小鸡切换动画
setInterval(function() {
	var runsList = $('.runs .run img');
	for(var i = 0, j = runsList.length; i < j; i++) {
		if($(runsList[i]).attr('src') === 'img/home/chook01/chooktu01.png') {
			$(runsList[i]).attr('src', 'img/home/chook01/chooktu02.png');
		}else if($(runsList[i]).attr('src') === 'img/home/chook01/chooktu02.png') {
			$(runsList[i]).attr('src', 'img/home/chook01/chooktu03.png');
		}else if($(runsList[i]).attr('src') === 'img/home/chook01/chooktu03.png') {
			$(runsList[i]).attr('src', 'img/home/chook01/chooktu01.png');
		}

		if($(runsList[i]).attr('src') === 'img/home/chook02/chooktu01.png') {
			$(runsList[i]).attr('src', 'img/home/chook02/chooktu02.png');
		}else if($(runsList[i]).attr('src') === 'img/home/chook02/chooktu02.png') {
			$(runsList[i]).attr('src', 'img/home/chook02/chooktu03.png');
		}else if($(runsList[i]).attr('src') === 'img/home/chook02/chooktu03.png') {
			$(runsList[i]).attr('src', 'img/home/chook02/chooktu01.png');
		}
		
		if($(runsList[i]).attr('src') === 'img/home/chook03/chooktu01.png') {
			$(runsList[i]).attr('src', 'img/home/chook03/chooktu02.png');
		}else if($(runsList[i]).attr('src') === 'img/home/chook03/chooktu02.png') {
			$(runsList[i]).attr('src', 'img/home/chook03/chooktu03.png');
		}else if($(runsList[i]).attr('src') === 'img/home/chook03/chooktu03.png') {
			$(runsList[i]).attr('src', 'img/home/chook03/chooktu01.png');
		}	
	}
}, 500);


// 显示公告
function showNotice() {
	var noticeText = '';

	var option = {
		url: 'api/henyard/getnotices',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			var list = [];
			list = result.data.notices;
			for(var i = 0, j = list.length; i < j; i++) {
				noticeText += list[i] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			}
			$(".notice .noticeText").append(noticeText);
		}
	}
	// console.log(1);
	myAjax(option);
}

// 收蛋
function collectEggs() {
	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'pickupeggs'
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			$(".footer .egg").html("");
			setTimeout(function(){
				$('.popup').css('display','none');
				window.location.assign("home.html");
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}


// 打扫
function sweep() {
	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'sweep'
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				window.location.assign("home.html");
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}

// 照顾小鸡
function consideration() {
	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'attend'
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				window.location.assign("home.html");
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);
}



// 喂养小鸡
function feed() {

	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'feed'
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				window.location.assign("home.html");
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}


// 治疗小鸡
function cure() {

	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'cure'
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				window.location.assign("home.html");
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}


function RankingList(data, index) {
	var templ = '';
	templ += '<li class="clearfix">';
	templ += 	'<i>' + index +'</i>';
	templ += 	'<span class="r-username">' + data.username + '</span>';
	templ += 	'<span class="r-num">'+ data.sum +'</span>';
	templ += '</li>';
	
	this.template = templ;

}


$(function(){
	//显示排行榜
	$('.toranking').on('click',function(){
		$('.mark').css('display','block');
		$('.ranking').css('display','block');

		// 加载数据
		var option = {
			url: 'api/henyard/leaderboard',
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				var henList = [],
				eggList = [];
				henList = result.data.hen;
				eggList = result.data.egg;
				
				$(".ranking-l .ranking-list").html('');
				for(var i = 0, j = henList.length; i < j; i++) {
					$(".ranking-l .ranking-list").append((new RankingList(henList[i], i + 1)).template);

				}
				$(".ranking-r .ranking-list").html('');
				for(var i = 0, j = eggList.length; i < j; i++) {
					$(".ranking-r .ranking-list").append((new RankingList(eggList[i], i + 1)).template);
				}
			}
		}

		myAjax(option);

	});
	//关闭排行榜
	$('.ranking .r-close').on('click',function(){
		$('.mark').css('display','none');
		$('.ranking').css('display','none');
	});
	$('.ranking .r-sure').on('click',function(){
		$('.mark').css('display','none');
		$('.ranking').css('display','none');
	});
	
	//显示商店
	$('.shop').on('click',function(){
		$('.mark').css('display','block');
		$('.m-shop').css('display','block');
	});
	//关闭商店
	$('.m-shop .s-close').on('click',function(){
		$('.mark').css('display','none');
		$('.m-shop').css('display','none');
		window.location.assign("home.html");
	});

	// 购买商品
	$('.m-shop .i-buy').on('click',function(){
		var data = {};
		if(this === $('.m-shop .i-buy').eq(0)[0]) {
			data = {
				identity: 'medikit',
				num: 1
			};
		}
		if(this === $('.m-shop .i-buy').eq(1)[0]) {
			data = {
				identity: 'fodder',
				num: 1
			};
		}
		if(this === $('.m-shop .i-buy').eq(2)[0]) {
			data = {
				identity: 'adventure_kit',
				num: 1
			};
		}
		if(this === $('.m-shop .i-buy').eq(3)[0]) {
			data = {
				identity: 'peacock',
				num: 1
			};
		}
		if(this === $('.m-shop .i-buy').eq(4)[0]) {
			data = {
				identity: 'wild_goose',
				num: 1
			};
		}
		if(this === $('.m-shop .i-buy').eq(5)[0]) {
			return;
		}

		var option = {
			url: 'api/shop/props',
			data: data,
			type: 'POST',
			success: function(result) {
				// console.log(result);
				if(result.status_code === 0) {
					$('.s-success').text(result.message);
					$('.s-success').css('display','block');
					setTimeout(function(){
						$('.s-success').css('display','none');
					},3000);
				}else {
					$('.s-error').text(result.message);
					$('.s-error').css('display','block');
					setTimeout(function(){
						$('.s-error').css('display','none');
					},3000);
				}
			},
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			}
		}

		myAjax(option);


	});

	// 商店道具购买
	$(".m-shop .s-sure").on("click", function() {
		$('.mark').css('display','none');
		$('.ranking').css('display','none');
		window.location.assign("home.html");
	})
	
});




$(".rail-l img").on('click', function(event) {
	event.preventDefault();
	$('.popup').text("该功能有待开放");
	$('.popup').css('display','block');
	setTimeout(function(){
		$('.popup').css('display','none');
	},3000);
});

$(".rail-r img").on('click', function(event) {
	event.preventDefault();
	$('.popup').text("该功能有待开放");
	$('.popup').css('display','block');
	setTimeout(function(){
		$('.popup').css('display','none');
	},3000);
});


// 显示大礼包
$(".giftPackage-img").on('click', function() {

	$('.mark').css('display','none');
	$('.m-shop').css('display','none');

	$('.mark').css('display','block');
	$('.m-giftPackage').css('display','block');
});

// 关闭大礼包
$('.m-giftPackage .s-close').on('click',function(){
	$('.mark').css('display','none');
	$('.m-giftPackage').css('display','none');
	
	$('.mark').css('display','block');
	$('.m-shop').css('display','block');

});

$('.m-giftPackage .s-sure').on('click',function(){
	$('.payModal .payCodeImg img').attr('src', '');
	$('.payModal .payCodeImg').css('display', 'none');
	$('.payModal').css('display', 'block');
});
$('.payModal .back').on('click', function() {
	window.location.assign('home.html');
});
$('.payModal .toPay').on('click', function() {
	$('.m-giftPackage .s-sure').trigger('payForGift');
	$('.payModal .toPay').attr('disabled', true);
	$('.popup').show().delay(4000).hide(300);
	$('.popup').html('操作成功，请稍后');
	setTimeout(function() {
		$('.payModal .toPay').attr('disabled', false);
	}, 5000);
});

// 确定购买大礼包
$('.m-giftPackage .s-sure').on('payForGift',function(){
	// $('.mark').css('display','none');
	// $('.m-giftPackage').css('display','none');
	var pay_type = $(".payModal .radios input[type='radio']:checked").val();
	var option = {
		url: 'api/shop/giftpack',
		data: {
			name: 'giftpack',
			num: 1,
			pay_type: pay_type
		},
		type: 'POST',
		success: function(result) {
			if(result.status_code === 0) {
				// $('.s-success').text(result.message);
				// $('.s-success').css('display','block');
				// setTimeout(function(){
				// 	$('.s-success').css('display','none');
				// },3000);
				// console.log(result);
				if(result.data.redirect_url !== '') {
					window.location.assign(result.data.redirect_url);
				}else if(result.data.qrcode_img !== '') {
					$('.popup').show().delay(5000).hide(300);
					$('.popup').html(result.message);
					$('.payModal .payCodeImg img').attr('src', result.data.qrcode_img);
					$('.payModal .payCodeImg').css('display', 'block');
				}

			}else {
				$('.popup').show().delay(2000).hide(300);
				$('.popup').html(result.message);
			}
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);


});

$('.m-giftPackage .s-giveGiftPackage').on('click', function() {
	$('#myModal').modal({
		keyboard: true
	});
	$('.modal .payCodeImg2 img').attr('src', '');
	$('.modal .payCodeImg2').css('display', 'none');
});

// $(".giveGiftPackage").on('click', function() {
// 	$('#myModal').modal({
// 		keyboard: true
// 	});
// });

$(".sendGiftToFriend").on('click', function() {

	var phone = $(".friendPhone").val();
	if(phone === '' || phone === null) {
		$('.popup').show().delay(2000).hide(300);
		$('.popup').html('请填写手机号码！');
		return;
	}
	var pay_type = $(".modal .pay-body input[type='radio']:checked").val();
	if(pay_type === '' || pay_type === null || pay_type === undefined) {
		$('.popup').show().delay(2000).hide(300);
		$('.popup').html('请选择支付方式！');
		return;
	}

	var option = {
		url: 'api/shop/giftpack/present',
		data: {
			name: 'giftpack',
			num: 1,
			phone: phone,
			pay_type: pay_type
		},
		type: 'POST',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			if(result.status_code === 0) {
				// window.location.assign(data.redirect_url);
				if(result.data.redirect_url !== '') {
					window.location.assign(result.data.redirect_url);
				}else if(result.data.qrcode_img !== '') {
					$('.popup').show().delay(5000).hide(300);
					$('.popup').html(result.message);
					$('.modal .payCodeImg2 img').attr('src', result.data.qrcode_img);
					$('.modal .payCodeImg2').css('display', 'block');
				}
				
			}else {
				$('.popup').show().delay(2000).hide(300);
				$('.popup').html(result.message);
			}
		}
	}

	myAjax(option);
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