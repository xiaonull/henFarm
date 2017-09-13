$(".tradingNav li").on("click", function() {
	$(".tradingNav li").removeClass("active");
	$(this).addClass("active");
	var index = -1;
	for(var i = 0, j = $(".tradingNav li").length; i < j; i++) {
		if(this === $(".tradingNav li").eq(i)[0]) {
			index = i;
			break;
		}
	}

	switchPanel(index);

});

function switchPanel(index) {
	$(".tradingPanel .active").removeClass("active");
	$(".tradingPanel section").eq(index).addClass("active");

} 