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
		// console.log(result);
		if(result.status_code === 0) {
			var profile = result.data.profile;
			$(".main .banner .username").text(profile.name);
			sessionStorage.userName = profile.name;
			$(".main .banner .b-right li").eq(0).append(profile.amount);
			$(".main .banner .b-right li").eq(1).append(profile.egg);
			$(".main .banner .b-right li").eq(2).append(profile.golden_egg);
			$(".main .banner .b-right li").eq(3).append(profile.coin);
			$(".main .banner .b-right li").eq(4).append(profile.medikit);
			$(".main .banner .b-right li").eq(5).append(profile.fodder);
		}
	}
}

myAjax(option);

