// 控制背景音乐
if(!localStorage.musicFlag) {
	localStorage.musicFlag = 'open';
}

(function() {
	var mainBgMusic = document.getElementById('mainBgMusic');
	if(localStorage.musicFlag === 'close') {
		// 关闭音乐
		mainBgMusic.pause();
		$('.mainBgMusicCtrl').css('backgroundImage', 'url("./img/home/music-close.png")');
	}

	$('.mainBgMusicCtrl').on('click', function() {
		var mainBgMusic = document.getElementById('mainBgMusic');
		if(localStorage.musicFlag === 'open') {
			// 关闭音乐
			mainBgMusic.pause();
			localStorage.musicFlag = 'close';
			$('.mainBgMusicCtrl').css('backgroundImage', 'url("./img/home/music-close.png")');
		}else {
			// 开启音乐
			mainBgMusic.play();
			localStorage.musicFlag = 'open';
			$('.mainBgMusicCtrl').css('backgroundImage', 'url("./img/home/music.png")');
		}
	});
})();


//轮询公告
(function() {
	var left = 10;
	var interval1 = setInterval(function() {
		left -= 1;
		$(".notice .noticeText").css({
			left: left + 'px'
		});
	}, 100);
	showNotice();
	var interval2 = setInterval(function() {
		showNotice();
	}, 120000);
})();

// 显示公告
function showNotice() {
	var noticeText = '';

	var option = {
		url: 'api/henyard/getnotices',
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			var list = [];
			list = result.data.notices;
			for(var i = 0, j = list.length; i < j; i++) {
				noticeText += list[i] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
			}
			$(".notice .noticeText").append(noticeText);
		}
	}
	// console.log(1);
	myAjax(option);
}


// 收蛋
function collectEggs() {
	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'pickupeggs'
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			$(".footer .egg").html("");
			setTimeout(function(){
				$('.popup').css('display','none');
				// window.location.assign("home.html");
				window.refreshResources();
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}


// 打扫
function sweep() {
	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'sweep',
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				// window.location.assign("home.html");
				window.refreshResources();
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}

// 照顾小鸡
function consideration() {
	var type = '';
	if(window.farm === 'wild_goosesFarm') {
		type = 'wild_goose';
	}else if(window.farm === 'peacockFarm') {
		type = 'peacock';
	}

	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'attend',
			type: type
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				// window.location.assign("home.html");
				window.refreshResources();
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);
}



// 喂养小鸡
function feed() {
	var type = '';
	if(window.farm === 'wild_goosesFarm') {
		type = 'wild_goose';
	}else if(window.farm === 'peacockFarm') {
		type = 'peacock';
	}

	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'feed',
			type: type
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				// window.location.assign("home.html");
				window.refreshResources();
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}


// 治疗小鸡
function cure() {
	var type = '';
	if(window.farm === 'wild_goosesFarm') {
		type = 'wild_goose';
	}else if(window.farm === 'peacockFarm') {
		type = 'peacock';
	}

	var option = {
		url: 'api/interaction/hen',
		data: {
			action: 'cure',
			type: type
		},
		type: 'POST',
		success: function(result) {
			$('.popup').text(result.message);
			$('.popup').css('display','block');
			setTimeout(function(){
				$('.popup').css('display','none');
				// window.location.assign("home.html");
				window.refreshResources();
			},3000);
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	}

	myAjax(option);

}