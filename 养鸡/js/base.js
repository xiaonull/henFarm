var app = app || {};
app.hts.controlJsonP = true;


function controlJsonP(url, callback) {
	if(app.hts.controlJsonP) {
		$.getJSON(url, function(data) {
			callback(data);
		});
	}else {
		$.get(url, function(data,status){
    		callback(data,status);
  		});
	}
	
}