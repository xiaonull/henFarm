function myAjax(option) {
	var domainName = 'http://farmapi.niowoo.cn/';
	// var domainName = 'http://zhifu.jlb66.com/';
	$.ajax({
		url: domainName + option.url,
		type: option.type || 'GET',
		data: option.data,
		success: function(result, status, xhr) {
			option.success(result, status, xhr);  	
		},
		beforeSend: function(xhr) {
			if(option.beforeSend) {
				xhr.setRequestHeader("Authorization", sessionStorage.token);
				option.beforeSend(xhr);
			}
		},
		complete : function(xhr){
			if(option.complete) {
				sessionStorage.token = xhr.getResponseHeader("Authorization");
				option.complete(xhr);
			}
		},
		error: function() {
			sessionStorage.error = true;
			alert('error');
			// window.location.assign("index.html");
		}
	});
}