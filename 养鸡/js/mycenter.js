var option = {
	url: 'api/personal/profile',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		console.log(result);
		if(result.data.profile.avatar !== '') {
			$('.main .banner .b-left .photo label').css('backgroundImage', 'url(' + result.data.profile.avatar + ')');
		}
	}
}

myAjax(option);

$(".logout").on('click', function(event) {
	sessionStorage.token = "";
});

var option = {
	url: 'api/henyard/profile',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		console.log(result);
		if(result.status_code === 0) {
			var profile = result.data.profile;
			$(".main .banner .username").text(profile.name);
			$(".main .banner .userid").text('我的ID：' + profile.id);

			$(".main .banner .b-right li").eq(0).append(profile.amount);
			$(".main .banner .b-right li").eq(1).append(profile.egg);
			$(".main .banner .b-right li").eq(2).append(profile.golden_egg);
			$(".main .banner .b-right li").eq(3).append(profile.coin);
			$(".main .banner .b-right li").eq(4).append(profile.medikit);
			$(".main .banner .b-right li").eq(5).append(profile.fodder);
			
			sessionStorage.userName = profile.name;
			sessionStorage.phone = profile.phone;

		}
	}
}

myAjax(option);

function uploadHeader() {
	var data = new FormData(document.getElementById('avatar'));
	console.log(data);
	var option = {
		url: 'api/personal/avatar/change',
		data: data,
		type: 'POST',
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: false,
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			console.log(result.message);
			var option = {
				url: 'api/personal/profile',
				beforeSend: function(xhr) {
				},
				complete: function(xhr) {
				},
				success: function(result) {
					console.log(result);
					if(result.data.profile.avatar) {
						$('.main .banner .b-left .photo label').css('backgroundImage', 'url(' + result.data.profile.avatar + ')');
					}
				}
			}

			myAjax(option);
		}
	}

	myAjax(option);
}

$('.withdrawalsBtn').on('click', function(event) {
	event.preventDefault();
	$('#myModal').modal({
		keyboard: true
	});
});

var prompt = $('.prompt');  
$('.withdrawalsCoinBtn').on('click', function(event) {
	event.preventDefault();
	var num = $('.num').val();
	if(num === '' || num === null || num === '0') {
		prompt.show().delay(2000).hide(300);
		prompt.html("请输入提取数额！");    
		return;
	}

	var option = {
		url: 'api/personal/coin2cash',
		type: 'POST',
		data: {
			number: num
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			prompt.show().delay(2000).hide(300);
			prompt.html(result.message);  

			if(result.status_code === 0) {
				$('.money_text').html('￥' + $('.num').val());
				$('.share').css('display', 'block');
			}
		}
	}

	myAjax(option);
	
});

$('.shareImg').on('click', function(e) {
	e.stopPropagation();
})

$('.share').on('click', function() {
	$('.share').css('display', 'none');
})

