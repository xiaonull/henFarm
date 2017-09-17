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
		}
	};

	myAjax(option);
})();


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

	if(myreg.test(phone) && trueName !== '' && address !== '') {
		var data = {
			true_name: trueName,
			phone: phone,
			address: address,
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
	}
});