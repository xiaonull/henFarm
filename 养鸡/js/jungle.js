var myScroll;

function loaded() {
	myScroll = new iScroll('wrapper', {
		scrollbarClass: 'myScrollbar',
		hScrollbar: false,
		vScroll: true,
		hideScrollbar: false //是否隐藏滚动条  
	});	
}
document.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);
document.addEventListener('DOMContentLoaded', loaded, false);
/*显示弹层层调用show方法时重新调用new iScroll()*/
$(function(){
	setTimeout(()=>{
		$('.mark').hide().css('opacity',1);
	},0);

	$('.jungle-l img').on('click',function(){		
		
		var option = {
			url: 'api/henyard/profile',
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				// console.log(result);
				if(result.data.profile.adventure_kit > 0) {
					window.location.assign("expedition.html");
				}else {
					var $prompt = $('.prompt');	
					$prompt.show().delay(2000).hide(300);
					$prompt.html('探险装备不足');
				}
			}
		}

		myAjax(option);

	});

	$('.jungle-r img').on('click',function(){		
		$('.mark').show();	
		
		var option = {
			url: 'api/henyard/adventure/records',
			beforeSend: function(xhr) {
			},
			complete: function(xhr) {
			},
			success: function(result) {
				console.log(result);
				var list = [];
				list = result.data.records;
				$(".mark .jungleRecords").html('');
				for(var i = 0, j = list.length; i < j; i++) {
					$(".mark .jungleRecords").append((new Jungle(list[i])).template);
				}
			}
		}

		myAjax(option);

	});

	$('.box .close').on('click',function(){
		$('.mark').hide();
	});

	$('.box .sure').on('click',function(){
		$('.mark').hide();
	});
});


function Jungle(data) {
	var time = data.time.split(' ')[0];

	var templ = '';
	templ += '<li>';
	templ += 	'<span class="time">' + time + '</span> ';
	templ += 	'<span class="success">探险成功</span> ';
	if(data.item !== '') {
		templ += 	'<span class="gold">获得' + data.item + '<i> x ' + data.num + '</i></span>';
	}
	templ += '</li>';

	this.template = templ;
}

