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
	$('.jungle-r img').on('click',function(){		
		$('.mark').show();			
	});
	$('.box .close').on('click',function(){
		$('.mark').hide();
	});
	$('.box .sure').on('click',function(){
		$('.mark').hide();
	});
});
