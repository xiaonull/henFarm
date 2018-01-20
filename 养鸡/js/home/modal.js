// 显示仓库
$(".warehouse").on('click', function() {
	$('.mark').css('display','block');
	$('.mark .warehousePannel').css('display','block');
	
	// 加载数量
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

// 关闭往期价格
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
	// window.location.assign("home.html");
	window.refreshResources();
});
$('.exchangePannel .s-sure').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .exchangePannel').css('display','none');
	// window.location.assign("home.html");
	window.refreshResources();
});


// 打开好友
$('.friends').on('click', function() {
	$('.mark').css('display','block');
	$('.mark .friendsPannel').css('display','block');

	loadFriends();
});

function loadFriends() {
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
				var state = '打扫';
				if(friendsList[i].sweep_chance <= 0) {
					state = '不可打扫';
				}else if(friendsList[i].has_swept === true) {
					state = '已打扫';
				}

				templ += '<tr>';
				templ += 	'<td class="friengName">' + friendsList[i].name + '</td>';
				templ += 	'<td><button class="sweepForFriend" friendId="' + friendsList[i].id + '">' + state + '</button></td>';
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

						// 更新打扫状态
						loadFriends();

					}
				}

				myAjax(option);
			});

			// 为好友打扫
			$('.friendsPannel .sweepForFriend').on('click', function(e) {
				var option = {
					url: 'api/personal/friends/sweep',
					type: 'POST',
					data: {
						friend_user_id: $(this).attr('friendId')
					},
					beforeSend: function(xhr) {
					},
					complete: function(xhr) {
					},
					success: function(result) {
						$('.popup').text(result.message);
						$('.popup').css('display', 'block');
						setTimeout(function(){
							$('.popup').css('display','none');
						},3000);

						// 更新打扫状态
						loadFriends();
					}
				}

				myAjax(option);
			});

		}
	}

	myAjax(option);
}

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


// 显示邮箱
$(".email").on('click', function() {
	$('.mark').css('display','block');
	$('.mark .emailPannel').css('display','block');

	// 加载数据
	loadEmail();
});

function loadEmail() {
	var option = {
		url: 'api/gmmail/mail',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {						
		},
		success: function(result) {
			// console.log(result)
			if(result.status_code === 0) {
				$('.emailPannel .emailPannel_main').css('display', 'block');
				var data = result.data;
				$('.emailPannel .emailPannel_main').empty();
				for(var i = 0, l = data.length; i < l; i++) {
					var templ = '';
					var title = data[i].mail_title.length > 13 ? data[i].mail_title.slice(0, 13) + '...' : data[i].mail_title;
					var state =  data[i].status === '-1' ? '<span class="state">未读</span>' : '';
					templ += '<div class="item">';
					templ += 	'<span class="title">' + title + '</span>';
					templ += 	'<span class="item_btn item_btn_' + data[i].id + '">';
					templ += 		state;
					templ += 	'</span>';
					templ += 	'<p class="content">' + data[i].contents + '</p>';
					templ += '</div>';

					$('.emailPannel .emailPannel_main').append(templ);
					
					(function() {
						// 查看邮件内容
						var id = data[i].id;
						var sender = data[i].sender;
						var time = data[i].created_at;
						var contents =  data[i].contents;
						$('.emailPannel .emailPannel_main ' + '.item_btn_' + id).on('click', function() {
							$('.emailPannel .emailPannel_main').css('display', 'none');
							$('.emailPannel .emailContent').css('display', 'block');
							$('.emailPannel .emailContent .emailId').html(id);
							$('.emailPannel .emailContent .sender').html(sender);
							$('.emailPannel .emailContent .time').html(time);
							$('.emailPannel .emailContent .content').html(contents);

							markread(id);
						});
					})();
				}
			}
		}
	}

	myAjax(option);
}

function markread(id) {
	var option = {
		url: 'api/gmmail/markread/' + id,
		type: 'POST',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {						
		},
		success: function(result) {
			
		}
	}

	myAjax(option);
}

// 是否有未读邮件
function emailStatus() {
	var option = {
		url: 'api/gmmail/mail',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {						
		},
		success: function(result) {
			if(result.status_code === 0) {
				var data = result.data;
				for(var i = 0, l = data.length; i < l; i++) {
					if(data[i].status === '-1') {
						$('.email .hasNotRead').css('display', 'block');
						return;
					}
				}

				$('.email .hasNotRead').css('display', 'none');
			}
		}
	}

	myAjax(option);
};

emailStatus();

// 返回邮件列表
$('.emailContent .backBtn').on('click', function() {
	loadEmail();

	$('.emailPannel .emailPannel_main').css('display', 'block');
	$('.emailPannel .emailContent').css('display', 'none');
	$('.emailPannel .emailContent .emailId').html('');
	$('.emailPannel .emailContent .sender').html('');
	$('.emailPannel .emailContent .time').html('');
	$('.emailPannel .emailContent .content').html('');
});

// 删除邮件
$('.emailContent .delBtn').on('click', function() {
	var id = $('.emailPannel .emailContent .emailId').html();
	var option = {
		url: 'api/gmmail/delmail/' + id,
		type: 'POST',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {						
		},
		success: function(result) {
			if(result.status_code === 0) {
				loadEmail();
				
				$('.emailPannel .emailPannel_main').css('display', 'block');
				$('.emailPannel .emailContent').css('display', 'none');
				$('.emailPannel .emailContent .emailId').html('');
				$('.emailPannel .emailContent .sender').html('');
				$('.emailPannel .emailContent .time').html('');
				$('.emailPannel .emailContent .content').html('');
			}
		}
	}

	myAjax(option);
});

// 关闭邮箱
$('.emailPannel .s-close').on('click',function(){
	$('.mark').css('display','none');
	$('.mark .emailPannel').css('display','none');

	//清空数据
	$('.emailPannel .emailContent').css('display', 'none');
	$('.emailPannel .emailContent .emailId').html('');
	$('.emailPannel .emailContent .sender').html('');
	$('.emailPannel .emailContent .time').html('');
	$('.emailPannel .emailContent .content').html('');

	emailStatus();
});


// 排行榜模板
function RankingList(data, index) {
	var templ = '';
	templ += '<li class="clearfix">';
	templ += 	'<i>' + index +'</i>';
	templ += 	'<span class="r-username">' + data.username + '</span>';
	templ += 	'<span class="r-num">'+ data.sum +'</span>';
	templ += '</li>';
	
	this.template = templ;
}

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

	var option = {
		url: 'api/shop/prices',
		type: 'GET', 
		success: function(result) {
			if(result.status_code === 0) {
				// console.log(result)
				$('.m-shop .peacockPrice').html(result.data.peacock / 100 + '￥');
				$('.m-shop .wild_goosePrice').html(result.data.wild_goose / 100 + '￥');
				$('.m-shop .giftpackPrice').html(result.data.giftpack / 100 + '￥');
				sessionStorage.giftpackPrice = result.data.giftpack / 100;
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

//关闭商店
$('.m-shop .s-close').on('click',function(){
	$('.mark').css('display','none');
	$('.m-shop').css('display','none');
	// window.location.assign("home.html");
	window.refreshResources();
});
$(".m-shop .s-sure").on("click", function() {
	$('.mark').css('display','none');
	$('.m-shop').css('display','none');
	// window.location.assign("home.html");
	window.refreshResources();
})

// 批量购买
$('.m-shop .count .add').on('click', function() {
	var num = $(this).next().html() * 1 + 1;
	$(this).next().html(num);
});

$('.m-shop .count .reduce').on('click', function() {
	var num = $(this).prev().html() * 1 - 1;
	if(num <= 0) {
		return;
	}
	$(this).prev().html(num);
});

// 购买商品
$('.m-shop .i-buy').on('click',function(){
	var data = {};
	if(this === $('.m-shop .i-buy').eq(0)[0]) {
		data = {
			identity: 'medikit',
			num: $('.medicalKit_num').html() *1
		};
	}
	if(this === $('.m-shop .i-buy').eq(1)[0]) {
		data = {
			identity: 'fodder',
			num: $('.fodder_num').html() *1
		};
	}
	if(this === $('.m-shop .i-buy').eq(2)[0]) {
		data = {
			identity: 'adventure_kit',
			num: $('.adventureKit_num').html() *1
		};
	}
	if(this === $('.m-shop .i-buy').eq(3)[0]) {
		data = {
			identity: 'peacock',
			num: $('.peacock_num').html() *1
		};
	}
	if(this === $('.m-shop .i-buy').eq(4)[0]) {
		data = {
			identity: 'wild_goose',
			num: $('.wild_gooses_num').html() *1
		};
	}
	if(this === $('.m-shop .i-buy').eq(5)[0]) {
		return;
	}

	var url = 'api/shop/props';
	if(data.identity === 'peacock' || data.identity === 'wild_goose') {
		// url = 'api/shop/animal';

		if(data.identity === 'peacock') {
			$('.payModal .title').html('购买' + $('.peacock_num').html() *1 + '只孔雀');
		}else if(data.identity === 'wild_goose') {
			$('.payModal .title').html('购买' + $('.wild_gooses_num').html() *1 + '只大雁');
		}
		window.hts_identity = data.identity,
		window.hts_num = data.num,
		window.buyAnimal = true;
		$('.payModal .payCodeImg').css('display', 'block');
		$('.payModal').css('display', 'block');

		return;

	}

	var option = {
		url: url,
		data: data,
		type: 'POST', 
		success: function(result) {
			if(result.status_code === 0) {
				if(result.data.qrcode_img) {
					if(data.identity === 'peacock') {
						$('.payModal .title').html('购买孔雀');
					}else if(data.identity === 'wild_goose') {
						$('.payModal .title').html('购买大雁');
					}

					$('.payModal .payCodeImg img').attr('src', result.data.qrcode_img);
					$('.payModal .payCodeImg').css('display', 'block');
					$('.payModal').css('display', 'block');
				}else {
					$('.popup').text(result.message);
					$('.popup').css('display','block');
					setTimeout(function(){
						$('.popup').css('display','none');
					},2000);
				}
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

// 购买大礼包
$('.m-giftPackage .s-sure').on('click',function(){
	$('.payModal .payCodeImg img').attr('src', '');
	$('.payModal .payCodeImg').css('display', 'none');
	// $('.m-giftPackage .s-sure').trigger('payForGift');
	window.buyAnimal = false;
	$('.payModal .title').html('购买' + sessionStorage.giftpackPrice + '元大礼包');
	$('.payModal').css('display', 'block');
});

// 支付页面返回主页
$('.payModal .back').on('click', function() {
	window.location.assign('home.html');
});

// $('#wepay2').on('click', function() {
// 	$('.payModal .radios .toPay').html('刷新二维码');
// });

// $('#alipay2').on('click', function() {
// 	$('.payModal .radios .toPay').html('刷新二维码');
// });

// $('#fastpay').on('click', function() {
// 	$('.payModal .radios .toPay').html('确定支付');
// });

// 确认支付
$('.payModal .toPay').on('click', function() {
	$('.m-giftPackage .s-sure').trigger('payForGift');
	$('.payModal .toPay').attr('disabled', true);
	// $('.popup').show().delay(4000).hide(300);
	// $('.popup').html('操作成功，请稍后');
	setTimeout(function() {
		$('.payModal .toPay').attr('disabled', false);
	}, 5000);
});

// 确定购买大礼包
$('.m-giftPackage .s-sure').on('payForGift',function(){
	$('.mark').css('display','none');
	$('.m-giftPackage').css('display','none');
	var pay_type = $(".payModal .radios input[type='radio']:checked").val();
	
	if(pay_type === 'wepay' || pay_type === 'alipay') {
		$('.popup').show().delay(2000).hide(300);
		$('.popup').html('系统繁忙');
		return;
	}
	
	var pay_type ='wepay';
	var url = 'api/shop/giftpack';
	var data = {
		name: 'giftpack',
		num: 1,
		pay_type: pay_type
	};

	if(window.buyAnimal === true) {
		// 购买动物
		url = 'api/shop/animal';
		data = {
			identity: window.hts_identity,
			num: window.hts_num
		}
	}

	var option = {
		url: url,
		data: data,
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
					// $('.popup').show().delay(5000).hide(300);
					// $('.popup').html(result.message);
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

// 赠送大礼包--打开弹窗
$('.m-giftPackage .s-giveGiftPackage').on('click', function() {
	$('#myModal').modal({
		keyboard: true
	});
	$('.modal .payCodeImg2 img').attr('src', '');
	$('.modal .payCodeImg2').css('display', 'none');
});

// 赠送大礼包--支付
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