// 显示交易中心
$(".tradingcenter").on('click', function() {
	$('.mark').css('display','block');
	$('.mark .transactionPannel').css('display','block');
	
	loadtransactionsList();
});

// 交易中心的tab切换
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

// 加载出售列表数据
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

// 点击出售列表加载数据
$('.transactionPannel .saleList').on('click', function() {
	loadtransactionsList();
});


// 出售列表--购买
$('.transactionPannel .saleList-pannel').on('click', function(e) {
	// console.log($(e.target)[0].className);
	if($(e.target)[0].className !== 'saleList-pannel-buy') {
		return;
	}

	var transactionId = -1;
	
	// 查找被点击的按钮
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


// 委托交易--点击按钮加载仓库普通鸡蛋数量
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

// 委托交易--点击按钮加载仓库金鸡蛋数量
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

// 委托交易--确认出售
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





