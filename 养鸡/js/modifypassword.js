//	手机号码正则表达式
var myreg = /^1[34578]\d{9}$/;
//密码正则 6~20位
var mypsw = /^[0-9A-Za-z]{6,20}$/;

if(sessionStorage.phone) {
	$(".user input").attr({
		placeholder: sessionStorage.phone 
	});
}


//	提示框
$('.prompt').css('display','none');
var $prompt = $('.prompt');	

$(".confirmSubmit-btn").on('click', function(event) {
	event.preventDefault();
	var code = $(".code .codeInput").val(),
	phone = sessionStorage.phone,
	newPassword = $(".newPassword input").val(),
	confirmPassword = $(".confirmPassword input").val();
	if(code !== '' && mypsw.test(newPassword) && mypsw.test(confirmPassword) && newPassword === confirmPassword){
		var option = {
			url: '/api/personal/changepin',
			data: {
				new_pin: newPassword,
				phone: phone,
				verification_code: code
			},
			type: 'POST',
			success: function(result) {
				$prompt.show().delay(2000).hide(300);
				$prompt.html(result.message);
			},
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			}
		}

		myAjax(option);


	}else if(!mypsw.test(newPassword) || !mypsw.test(confirmPassword)) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入6~20位密码！');
	}else if(newPassword !== confirmPassword) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('两次输入的密码不相同！');
	}else if(code === '' || code === null) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请填写验证码！');
	}
});


// 点击发送验证码
$('.modifyPassword .sendCode').on('click', function(event) {
	event.preventDefault();
	var curPhone = sessionStorage.phone;
	console.log(curPhone);
	var data = {
		phone: curPhone
	};

	var option = {
		url: 'api/verificationcode/get',
		data: data,
		type: 'POST',
		success: function(result) {
			$prompt.show().delay(2000).hide(300);
			$prompt.html(result.message);
		}
	}

	myAjax(option); 
});
