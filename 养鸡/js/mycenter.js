var option = {
	url: 'api/personal/profile',
	beforeSend: function(xhr) {
	},
	complete: function(xhr) {
	},
	success: function(result) {
		console.log(result);
		if(result.data.profile.avatar) {
			$('.main .banner .b-left .photo label').css('backgroundImage', 'url(' + result.data.profile.avatar + ')');
		}
	}
}

myAjax(option);

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
		console.log(result);
		if(result.status_code === 0) {
			var profile = result.data.profile;
			$(".main .banner .username").text(profile.name);
			$(".main .banner .userid").text('我的ID：' + profile.id);

			$(".main .banner .b-right li").eq(0).append(profile.amount);
			$(".main .banner .b-right li").eq(1).append(profile.egg);
			$(".main .banner .b-right li").eq(2).append(profile.golden_egg);
			$(".main .banner .b-right li").eq(3).append(profile.coin);
			$(".main .banner .b-right li").eq(4).append(profile.medikit);
			$(".main .banner .b-right li").eq(5).append(profile.fodder);
			
			sessionStorage.userName = profile.name;
			sessionStorage.phone = profile.phone;

		}
	}
}

myAjax(option);

function uploadHeader() {
	var data = new FormData(document.getElementById('avatar'));
	console.log(document.getElementById('avatar'));
	var option = {
		url: 'api/personal/avatar/change',
		data: data,
		type: 'POST',
		dataType: 'json',
		cache: false,
		processData: false,
		contentType: false,
		beforeSend: function(xhr) {
		},
		complete: function(xhr) {
		},
		success: function(result) {
			console.log(result.message);
			var option = {
				url: 'api/personal/profile',
				beforeSend: function(xhr) {
				},
				complete: function(xhr) {
				},
				success: function(result) {
					console.log(result);
					if(result.data.profile.avatar) {
						$('.main .banner .b-left .photo label').css('backgroundImage', 'url(' + result.data.profile.avatar + ')');
					}
				}
			}

			myAjax(option);
		}
	}

	myAjax(option);
}



// // 初始化Web Uploader
// var uploader = WebUploader.create({

//     // 选完文件后，是否自动上传。
//     auto: true,

//     // swf文件路径
//     swf: './Uploader.swf',

//     // 文件接收服务端。
//     server: 'http://farmapi.niowoo.cn/api/personal/avatar/change',

//     // 选择文件的按钮。可选。
//     // 内部根据当前运行是创建，可能是input元素，也可能是flash.
//     pick: '#filePicker',

//     // 只允许选择图片文件。
//     accept: {
//     	title: 'Images',
//     	extensions: 'gif,jpg,jpeg,bmp,png',
//     	mimeTypes: 'image/*'
//     },
//     method: 'POST'
// });
// console.log(WebUploader);

// uploader.on( 'uploadSuccess', function( file ) {
// 	alert('ok');
// });

// // 文件上传失败，显示上传出错。
// uploader.on( 'uploadError', function( file ) {
// 	alert('error');
// });

// uploader.on( 'fileQueued', function( file ) {
// 	alert(1);
// });

// uploader.on( 'uploadComplete', function( file ) {
// 	alert(2);
// });

// var cropper;
// init();
// function init()
// {   
//     //绑定
//     cropper = new ImageCropper(300, 300, 180, 180);
//     cropper.setCanvas("cropper");
//     cropper.addPreview("preview180");
//     cropper.addPreview("preview100");
//     cropper.addPreview("preview50");
//     //检测用户浏览器是否支持imagecropper插件
//     if(!cropper.isAvaiable())
//     {
//     	alert("Sorry, your browser doesn't support FileReader, please use Firefox3.6+ or Chrome10+ to run it.");
//     }
// }

// //打开本地图片
// function selectImage(fileList)
// {
// 	cropper.loadImage(fileList[0]);
// 	setTimeout(function() {
// 		saveImage();
// 	}, 15000);

// }

// //旋转图片
// function rotateImage(e)
// {
// 	switch(e.target.id)
// 	{
// 		case "rotateLeftBtn":
// 		cropper.rotate(-90);
// 		break;
// 		case "rotateRightBtn":
// 		cropper.rotate(90);
// 		break;
// 	}
// }

// //上传图片
// function saveImage() {
//     //选个你需要的大小
//     var imgData = cropper.getCroppedImageData(180, 180);
//     console.log("上传了："+imgData);
//     //在这里写你的上传代码



//     var option = {
//     	url: 'api/personal/avatar/change',

//     	type: 'POST',
//     	data: {
//     		avatar: imgData
//     	},
//     	contentType: 'multipart/form-data',
//     	beforeSend: function(xhr) {
//     	},
//     	complete: function(xhr) {
//     	},
//     	success: function(result) {
//     		console.log(result);
//     	}
//     }

//     myAjax(option);
// }

