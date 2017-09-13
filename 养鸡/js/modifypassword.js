//	手机号码正则表达式
var myreg = /^1[34578]\d{9}$/;
//密码正则 6~20位
var mypsw = /^[0-9A-Za-z]{6,20}$/;
//	提示框
$('.prompt').css('display','none');
var $prompt = $('.prompt');	

$(".confirmSubmit-btn").on('click', function(event) {
	event.preventDefault();
	var passwordType = $(".passwordType input").val(),
	password = $(".password input").val(),
	newPassword = $(".newPassword input").val(),
	confirmPassword = $(".confirmPassword input").val();
	if(mypsw.test(password) && mypsw.test(newPassword) && mypsw.test(confirmPassword) && newPassword === confirmPassword){
		$prompt.show().delay(2000).hide(300);
		$prompt.html('ok！');
	}else if(!mypsw.test(password) || !mypsw.test(newPassword) || !mypsw.test(confirmPassword)) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('请输入6~20位密码！');
	}else if(newPassword !== confirmPassword) {
		$prompt.show().delay(2000).hide(300);
		$prompt.html('两次输入的密码不相同！');
	}
});

