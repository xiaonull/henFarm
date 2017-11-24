function Animal(id) {
	this.cla = '.runs .run' + id;
	this.timer = null;
	$(this.cla).css({
		"bottom": Math.random() * 100 + '%',
		"left": Math.random() * 90 + '%'
	});
}

// 动物的随机移动
Animal.prototype.move = function() {
	$(this.cla).css({
		"bottom": Math.random() * 100 + '%',
		"left": Math.random() * 90 + '%'
	});
	this.timer = setInterval(function() {
		var position = isRandomPosition();


		$(this.cla).animate(position, {
			speed: 100,
			easing: 'swing'
		});

	}.bind(this), 500);
}

function isRandomPosition() {
	var n = Math.floor(Math.random() * 2 + 1);
	if(n === 1) {
		return {
			"bottom":  isRandomPlus() + '=' + '40px'
		};
	}else if(n === 2) {
		return {
			"left":  isRandomPlus() + '=' + '40px'
		};
	}
	
}

function isRandomPlus() {
	var n = Math.floor(Math.random() * 2 + 1);
	if(n > 1) {
		return '+';
	}else {
		return '-';
	}
}

window.farm = 'henFarm';
showResources();
window.refreshResources = function() {
	showResources();
}
// 显示or刷新主页面的资源
function showResources() {
	var option = {
		url: 'api/henyard',
		success: function(result, status, xhr) {

			// 是否显示喂食提示气泡框
			if(result.data.feedable_num > 0) {
				$(".feedBubble .feedBubbleText").text('有 ' + result.data.feedable_num + ' 只鸡可以于今天喂食');
				$(".feedBubble").css({
					display: 'block'
				});
			}
			
			// 如果需要打扫，则显示垃圾背景图
			if(result.data.sweep_chance_num > 0) {
				$('.main .runs').css({
					backgroundImage: 'url("./img/home/waste.png")'
				});
			}else {
				$('.main .runs').css({
					backgroundImage: 'url("")'
				});
			}
			
			// 切换动物的房子
			// 页尾资源--动物和动物蛋的数量
			// 显示蛋窝的蛋的图片
			if(window.farm === 'henFarm') {
				$('.m-right .houseImg').attr('src', 'img/home/house.png');

				$(".rail-inf .rail-num .img1").attr({
					src: 'img/home/rail-ico03.png',
				});
				$(".rail-inf .rail-num .img2").attr({
					src: 'img/home/rail-ico04.png',
				});
				$(".rail-inf .rail-num .img3").attr({
					src: 'img/home/rail-ico05.png',
				});

				$(".rail-inf .rail-num li span").eq(0).html(result.data.hen_num );
				$(".rail-inf .rail-num li span").eq(1).html(result.data.egg_num);
				$(".rail-inf .rail-num li span").eq(2).html(result.data.golden_egg_num);

				if(result.data.pickable_egg_num > 0 || result.data.pickable_golden_egg_num > 0) {
					$(".footer .egg .eggImg").css('display', 'inline-block');
				}else {
					$(".footer .egg .eggImg").css('display', 'none');
				}
			}else if(window.farm === 'wild_goosesFarm') {
				$('.m-right .houseImg').attr('src', 'img/home/house01.png');

				$(".rail-inf .rail-num .img1").attr({
					src: 'img/home/rail-ico06.png',
				});
				$(".rail-inf .rail-num .img2").attr({
					src: 'img/home/store-ico05.png',
				});
				$(".rail-inf .rail-num .img3").attr({
					src: 'img/home/rail-ico05.png',
				});

				$(".rail-inf .rail-num li span").eq(0).html(result.data.wild_gooses.length );
				$(".rail-inf .rail-num li span").eq(1).html(result.data.wild_goose_egg);
				$(".rail-inf .rail-num li span").eq(2).html(result.data.golden_egg_num);

				if(result.data.wild_goose_pickable_egg_num > 0) {
					$(".footer .egg .eggImg").css('display', 'inline-block');
				}else {
					$(".footer .egg .eggImg").css('display', 'none');
				}
			}else if(window.farm === 'peacockFarm') {
				$('.m-right .houseImg').attr('src', 'img/home/house02.png');

				$(".rail-inf .rail-num .img1").attr({
					src: 'img/home/rail-ico07.png',
				});
				$(".rail-inf .rail-num .img2").attr({
					src: 'img/home/store-ico06.png',
				});
				$(".rail-inf .rail-num .img3").attr({
					src: 'img/home/rail-ico05.png',
				});

				$(".rail-inf .rail-num li span").eq(0).html(result.data.peacocks.length );
				$(".rail-inf .rail-num li span").eq(1).html(result.data.peacock_egg);
				$(".rail-inf .rail-num li span").eq(2).html(result.data.golden_egg_num);

				if(result.data.peacock_pickable_egg_num > 0) {
					$(".footer .egg .eggImg").css('display', 'inline-block');
				}else {
					$(".footer .egg .eggImg").css('display', 'none');
				}
			}
			
			
			$(".main .runs").empty();
			// 生成动物群
			var animals = [];
			if(window.farm === 'henFarm') {
				animals = result.data.hen_details;
			}else if(window.farm === 'wild_goosesFarm') {
				animals = result.data.wild_gooses;
			}else if(window.farm === 'peacockFarm') {
				animals = result.data.peacocks;
			}

			for(var i = 0, j = animals.length; i < j; i++) {
				var img = '';
				var state = '';
				if(animals[i].is_grown === "false") {
					// 生成小鸡、小雁或小孔雀
					state = '幼年期';
					if(window.farm === 'henFarm') {
						var n = Math.floor(Math.random() * 2 + 1);
						if(n === 1) {
							img = '<img class="hen' + i + '" src="img/home/chook01/chooktu01.png" />';
						}else {
							img = '<img class="hen' + i + '" src="img/home/chook02/chooktu01.png" />';
						}
					}else if(window.farm === 'wild_goosesFarm') {
						img = '<img class="hen' + i + '" src="img/home/goose01.gif" />';
					}else if(window.farm === 'peacockFarm') {
						img = '<img class="hen' + i + '" src="img/home/peacock01.gif" />';
					}
				}else {
					state = '成年期';
					if(window.farm === 'henFarm') {
						img = '<img class="hen' + i + '" src="img/home/chook03/chooktu01.png" />';
					}else if(window.farm === 'wild_goosesFarm') {
						img = '<img class="hen' + i + '" src="img/home/goose.gif" />';
					}else if(window.farm === 'peacockFarm') {
						img = '<img class="hen' + i + '" src="img/home/peacock.gif" />';
					}
				}

				var time = '-- -- --';

				if(animals[i].time_to_pick.length !== 0) {
					time = animals[i].time_to_pick.hour + ':' + animals[i].time_to_pick.minute + ':' + animals[i].time_to_pick.second;	
				}

				var templ = '';
				templ += '<div class="run run' + animals[i].id + '">';
				templ += 	'<div class="container">';
				templ +=        '<div class="bubble">';
				templ +=        	'<p>' + state + '</p>';
				templ +=        	'<p>' + animals[i].lifetime +'</p>';
				templ +=        	'<p>' + animals[i].is_sick === "false" ? '生病' : '健康' +'</p>';
				templ +=        	'<p class="clock">' + time +'</p>';
				templ +=        '</div>';
				templ += 		img;
				templ += 	'</div>';
				templ += '</div>';

				$(".main .runs").append(templ);
				new Animal(animals[i].id).move();

				if(animals[i].since_picked.length !== 0) {
					(function(index) {
						animalClock(index);
					})(animals[i].id);
				}

				function animalClock(i) {
					// 倒计时
					setInterval(function() {
						var runNum = '.run' + i;
						var timeList = $(".main .runs").find(runNum).find(".clock").text().split(':');
						var hour = timeList[0];
						var minute = timeList[1];
						var second = timeList[2];
						second = parseInt(second);
						minute = parseInt(minute);
						hour = parseInt(hour);
						second --;
						if(second === 0){
							minute --;
							second = '59';
						}else if(second < 10) {
							second = '0' + second.toString();
						}

						if(minute === 0) {
							hour --;
							minute = '59';
						}else if(minute < 10) {
							minute = '0' + minute.toString();
						}

						if(hour === 0) {
							hour = '00';
							minute = '00';
							second = '00';
							return;
						}else if(hour < 10) {
							hour = '0' + hour.toString();
						}

						var clock = hour + ':' + minute + ':' + second;
						$(".main .runs").find(runNum).find(".clock").text(clock);
					}, 1000);
				}
			}
			
			// 点击动物显示气泡
			$('.runs .run img').on('click', function(e) {
				var runsList = $('.runs .run img');
				// console.log($(e.target)[0]);
				for(var i = 0, j = runsList.length; i < j; i++) {
					if($(e.target)[0] === $('.runs .run img').eq(i)[0]) {
						$('.runs .run img').eq(i).parent().find('.bubble').css('display', 'block');
						setTimeout(function() {
							$('.runs .run img').eq(i).parent().find('.bubble').css('display', 'none');
						}, 3000);
						return;
					}
				}
			});			

			stopHenMove();
			if(window.farm === 'henFarm') {
				startHenMove();
			}
		},
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		}
	};

	myAjax(option);
}


// 小鸡移动的脚步切换动画
var startHenMove = function() {
	window.henMove_interval = setInterval(function() {
		var runsList = $('.runs .run img');
		for(var i = 0, j = runsList.length; i < j; i++) {
			if($(runsList[i]).attr('src') === 'img/home/chook01/chooktu01.png') {
				$(runsList[i]).attr('src', 'img/home/chook01/chooktu02.png');
			}else if($(runsList[i]).attr('src') === 'img/home/chook01/chooktu02.png') {
				$(runsList[i]).attr('src', 'img/home/chook01/chooktu03.png');
			}else if($(runsList[i]).attr('src') === 'img/home/chook01/chooktu03.png') {
				$(runsList[i]).attr('src', 'img/home/chook01/chooktu01.png');
			}

			if($(runsList[i]).attr('src') === 'img/home/chook02/chooktu01.png') {
				$(runsList[i]).attr('src', 'img/home/chook02/chooktu02.png');
			}else if($(runsList[i]).attr('src') === 'img/home/chook02/chooktu02.png') {
				$(runsList[i]).attr('src', 'img/home/chook02/chooktu03.png');
			}else if($(runsList[i]).attr('src') === 'img/home/chook02/chooktu03.png') {
				$(runsList[i]).attr('src', 'img/home/chook02/chooktu01.png');
			}

			if($(runsList[i]).attr('src') === 'img/home/chook03/chooktu01.png') {
				$(runsList[i]).attr('src', 'img/home/chook03/chooktu02.png');
			}else if($(runsList[i]).attr('src') === 'img/home/chook03/chooktu02.png') {
				$(runsList[i]).attr('src', 'img/home/chook03/chooktu03.png');
			}else if($(runsList[i]).attr('src') === 'img/home/chook03/chooktu03.png') {
				$(runsList[i]).attr('src', 'img/home/chook03/chooktu01.png');
			}	
		}
	}, 500);
}

var stopHenMove = function() {
	if(window.henMove_interval) {
		clearInterval(window.henMove_interval);
	}
}


// 切换到大雁
$(".rail-l .img").on('click', function(event) {
	event.preventDefault();

	if(window.farm === 'henFarm') {
		$(".rail-l .img").attr('src', 'img/home/rail-ico00.png');
		window.farm = 'wild_goosesFarm';
		window.refreshResources();
	}else if(window.farm === 'wild_goosesFarm') {
		$(".rail-l .img").attr('src', 'img/home/rail-ico01.png');
		window.farm = 'henFarm';
		window.refreshResources();
	}else if(window.farm === 'peacockFarm') {
		$(".rail-l .img").attr('src', 'img/home/rail-ico00.png');
		$(".rail-r .img").attr('src', 'img/home/rail-ico02.png');
		window.farm = 'wild_goosesFarm';
		window.refreshResources();
	}
});


// 切换到孔雀
$(".rail-r .img").on('click', function(event) {
	event.preventDefault();
	
	if(window.farm === 'henFarm') {
		$(".rail-r .img").attr('src', 'img/home/rail-ico00.png');
		window.farm = 'peacockFarm';
		window.refreshResources();
	}else if(window.farm === 'peacockFarm') {
		$(".rail-r .img").attr('src', 'img/home/rail-ico02.png');
		window.farm = 'henFarm';
		window.refreshResources();
	}else if(window.farm === 'wild_goosesFarm') {
		$(".rail-r .img").attr('src', 'img/home/rail-ico00.png');
		$(".rail-l .img").attr('src', 'img/home/rail-ico01.png');
		window.farm = 'peacockFarm';
		window.refreshResources();
	}
});


