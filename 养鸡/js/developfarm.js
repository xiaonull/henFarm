//	手机号码正则表达式
var myreg = /^1[34578]\d{9}$/;
//密码正则 6~20位
var mypsw = /^[0-9A-Za-z]{6,20}$/;
//	提示框
$('.prompt').css('display','none');
var $prompt = $('.prompt');	

$(".developfarm .referee input").attr({
	placeholder: sessionStorage.userName
});

$(".confirmSubmit-btn").on('click', function(event) {
	event.preventDefault();
	var phone =  $(".phone input").val(),
	name = $(".nickname input").val(),
	password = $(".password input").val(),
	confirmPassword = $(".confirmPassword input").val();
	if(mypsw.test(password) && mypsw.test(confirmPassword) && password === confirmPassword && myreg.test(phone) && name !== '' && name !== null){
		var option = {
			url: 'api/openupfarm',
			data: {
				phone: phone,
				name: name,
				password: password,
				password_confirmation: confirmPassword
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


	}else if(!myreg.test(phone)) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入正确的手机号码！');
	}
	else if(name === '' || name === null) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入昵称！');
	}
	else if(!mypsw.test(password) || !mypsw.test(confirmPassword)) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入6~20位密码！');
	}else if(password !== confirmPassword) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('两次输入的密码不相同！');
	}
});

