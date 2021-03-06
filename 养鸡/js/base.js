function myAjax(option) {
	// var domainName = 'http://farmapi.niowoo.cn/';
	var domainName = 'http://zhifu.jlb66.com/';
	$.ajax({
		url: domainName + option.url,
		type: option.type || 'GET',
		data: option.data,
		dataType: option.dataType,
		contentType: option.contentType,
		processData: option.processData,
		cache: option.cache,
		success: function(result, status, xhr) {
			if(result.status_code === 401) {
				// alert("error");
				window.location.assign("index.html");
			}
			option.success(result, status, xhr);  	
		},
		beforeSend: function(xhr) {
			// console.log('token:' + sessionStorage.token);
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
			sessionStorage.error = 'true';
			// alert('error');
			window.location.assign("index.html");
		}
	});
}