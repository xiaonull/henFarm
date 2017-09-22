$(function(){

	// 自动填写密码
	if(localStorage.userName && localStorage.password) {
		$('.login .username input').val(localStorage.userName); 
		$('.login .password input').val(localStorage.password); 

		$(".login .rememberBox").attr("checked", true);

	}

	$('.forget .torevise').on('click',function(){
		$('.login').css('display','none');
		$('.revise').css('display','block');
		$('.prompt').css('display','none');
	});
	$('.forget .toregister').on('click',function(){
		$('.login').css('display','none');
		$('.register').css('display','block');
		$('.prompt').css('display','none');
	});

	// 识别二维码跳转信息
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r !== null) {
			return  unescape(r[2]);
		} 
		return null;
	}
	
	var registerUrl = 'api/register';
	var referrerPhone = GetQueryString('referrer');
	if(referrerPhone !== null) {
		registerUrl = 'api/register?referrer=' + referrerPhone;
		$('.forget .toregister').click();
	}
	
	
	//	手机号码正则表达式
	var myreg = /^1[34578]\d{9}$/;
	//密码正则 6~20位
	var mypsw = /^[0-9A-Za-z]{6,20}$/;
	//	提示框
	var prompt = $('.prompt');	
	if(sessionStorage.error === 'true') {
		prompt.show().delay(2000).hide(300);
		prompt.html("游戏操作出错，请重新登录");	
		sessionStorage.error = 'false';
	}


	//注册功能
	$('#register').on('submit',function(event){
		event.preventDefault();
		var phone = $('.register .phone input').val() * 1;
		var name = $('.register .name input').val();
		var code = $('.register .code-l').val() * 1;
		var psw = $('.register .password input').val();
		var repsw = $('.register .newpassword input').val();		
		if(myreg.test(phone) && name != '' && code != '' && mypsw.test(psw) && psw == repsw){
			// $('#register')[0].submit();
			var data = {
				phone: phone,
				verification_code: code,
				name: name,
				password: psw,
				password_confirmation: repsw
			};

			var option = {
				url: registerUrl,
				data: data,
				type: 'POST',
				success: function(result) {
					if(result.status_code === 0) {
						prompt.show().delay(2000).hide(300);
						prompt.html(result.message);
						sessionStorage.token = result.data.token;
						setTimeout(function() {
							window.location.assign("home.html");
						}, 2000);	
					}else {
						prompt.show().delay(2000).hide(300);
						prompt.html(result.message);
					}  
				}
			};

			myAjax(option);


		}else if(!myreg.test(phone)){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入正确的手机号码！');
		}else if(name == ''){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入昵称！');
		}else if(code==''){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入验证码！');
		}else if(!mypsw.test(psw)){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入6~20位密码！');
		}else if(psw != repsw){
			prompt.show().delay(2000).hide(300);
			prompt.html('两次输入的密码不相同！');
		}
	});

	$(".r-register-login").on('click', function() {
		window.location.assign("index.html");
	});

	$(".r-sure-toLogin").on('click', function() {
		window.location.assign("index.html");
	});

	//	登录功能
	$('#login').on('submit',function(event){
		event.preventDefault();

		var rememberBox = $(".login .rememberBox").is(":checked");

		var userName = $('.login .username input').val();	
		var psw = $('.login .password input').val();		
		if(userName != '' && mypsw.test(psw)){
			// $('#login')[0].submit();
			var data = {
				phone: userName,
				password: psw
			};

			var option = {
				url: 'api/login',
				data: data,
				type: 'POST',
				success: function(result) {
					if(result.status_code === 0) {
						// 保存token
						sessionStorage.token = result.data.token;
						// console.log(sessionStorage.token + 'ok');
						if(rememberBox) {
							localStorage.userName = userName;
							localStorage.password = psw;
						}else {
							localStorage.removeItem("userName");
							localStorage.removeItem("password");
						}

						// 登录成功，页面跳转
						window.location.assign("home.html");
					}else {
						prompt.show().delay(2000).hide(300);
						prompt.html(result.message);
					}
				}
			};

			myAjax(option);


		}else if(userName == ''){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入用户名！');				
			return false;			
		}else if(!mypsw.test(psw)){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入6~20位密码！');
			return false;
		}	
	});	

	//重置密码
	$('.r-sure').on('click',function(){
		var phone = $('.revise .phone input').val();
		var code = $('.revise .code-l').val();
		var newpsw = $('.revise .newpassword input').val();
		if(myreg.test(phone) && code != '' && mypsw.test(newpsw)){	
			var data = {
				phone: phone,
				verification_code: code,
				new_password: newpsw
			};

			var option = {
				url: 'api/login/resetpassword',
				data: data,
				type: 'POST',
				success: function(result) {
					if(result.status_code === 0) {
						sessionStorage.token = result.data.token;
						prompt.show().delay(2000).hide(300);
						prompt.html('修改密码成功！');
						setTimeout(function() {
							$('.login').css('display','block');
							$('.revise').css('display','none');
						}, 2000);

					}else {
						prompt.show().delay(2000).hide(300);
						prompt.html(result.message);
					}
				}
			};

			myAjax(option);


		}else if(!myreg.test(phone)){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入正确的手机号码！');
		}else if(code == ''){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入正确的验证码！');
		}else if(!mypsw.test(newpsw)){
			prompt.show().delay(2000).hide(300);
			prompt.html('请输入6~20位密码！');
		}
	});

	//验证码发送请求
	$(".code-r").on('click',function(){
		var curPhone = $('.register .phone input').val() || $('.revise .phone input').val();
		var data = {
			phone: curPhone
		};

		var option = {
			url: 'api/verificationcode/get',
			data: data,
			type: 'POST',
			success: function(result) {
				prompt.show().delay(2000).hide(300);
				prompt.html(result.message);
			}
		}

		myAjax(option); 



	});


});



