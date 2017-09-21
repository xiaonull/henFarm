(function() {

	var option = {
		url: 'api/personal/profile',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			var profile = result.data.profile;
			// console.log(profile);
			$('.profileContainer .trueName input').val(profile.true_name);
			$('.profileContainer .phone input').val(profile.phone);
			$('.profileContainer .address input').val(profile.address);
			$('.profileContainer .bankId select').val(profile.bank_id);
			$('.profileContainer .bankNum input').val(profile.accno);
			$('.profileContainer .bankName input').val(profile.subbank);
			$('.profileContainer .province input').val(profile.province);
			$('.profileContainer .city input').val(profile.city);

		}
	};

	myAjax(option);
})();

(function() {

	var option = {
		url: 'api/personal/banklist/get',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			console.log(result);
			var list = result.data;
			for(var i = 0, j = list.length; i < j; i++) {
				$('.bankId select').append('<option value="' + list[i].bank_id + '">' + list[i].bank_name + '</option>')
			}
		}
	};

	myAjax(option);
})();

// function test() {
// 	alert($('.bankId select').val());
// }

//	手机号码正则表达式
var myreg = /^1[34578]\d{9}$/;

//	提示框
var prompt = $('.prompt');

$(".user input").attr({
	placeholder: sessionStorage.phone
});

$(".name input").val(sessionStorage.userName);

$(".profileContainer .confirmSubmit-btn").on('click', function() {
	event.preventDefault();
	
	var trueName =  $('.profileContainer .trueName input').val();
	var phone = $('.profileContainer .phone input').val() * 1;
	var address = $('.profileContainer .address input').val();
	var bankId = $('.bankId select').val();
	var bankNum = $('.bankNum input').val();
	var bankName = $('.bankName input').val();
	var province = $('.province input').val();
	var city = $('.city input').val();
	var code = $('.code input').val();

	if(myreg.test(phone) && trueName !== '' && address !== '' && bankId !== '' && bankId !== null
		&& bankNum !== '' && bankName !== '' && province !== '' && city !== '' && code !== '') {
		var data = {
			true_name: trueName,
			phone: phone,
			address: address,
			bank_id: bankId,
			accno: bankNum,
			subbank: bankName,
			province: province,
			city: city,
			verification_code: code
		};

		var option = {
			url: 'api/personal/profile/set',
			data: data,
			type: 'POST',
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				prompt.show().delay(2000).hide(300);
				prompt.html(result.message);
			}
		};

		myAjax(option);

	}else if(trueName === '' || trueName === null) {
		prompt.show().delay(2000).hide(300);
		prompt.html("请输入真实姓名！");
	}else if(!myreg.test(phone)) {
		prompt.show().delay(2000).hide(300);
		prompt.html("请输入正确的手机号码！");
	}else if(address === '' || address === null) {
		prompt.show().delay(2000).hide(300);
		prompt.html("请输入真实地址！");
	}else if(code === '' || code === null) {
		prompt.show().delay(2000).hide(300);
		prompt.html("请输入验证码！");
	}else {
		prompt.show().delay(2000).hide(300);
		prompt.html("请完整填写银行信息！");
	}
});

$('.profileContainer .sendCode').on('click', function(event) {
	event.preventDefault();
	var curPhone = $('.profileContainer .phone input').val() * 1;
	if(!myreg.test(curPhone)) {
		prompt.show().delay(2000).hide(300);
		prompt.html("请输入正确的手机号码！");
	}
	console.log(curPhone);
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