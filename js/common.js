var baseUrl = 'http://im.klsjapp.com/'; //基础链接
var ajaxUrl = 'http://im.klsjapp.com';
var isDebug = false; //是否开启打印模式
var $aJax = {
	point: 'point', //接口的参数

	post: function(api, data, success) {
		var url = ajaxUrl + api;
		if (isDebug) {
			console.log('[URL]' + url);
			console.log('[PARM]' + JSON.stringify(data));
		}
		$.post(url, data, function(obj) {
			if (isDebug) console.log('[Res]' + JSON.stringify(obj));
			success(obj);
			// if(obj.msg=='cookei overtime!'){
			// 	window.location.href='http://www.yixuetang11.com/shop/auth/wechatpubliclogin'
			// 	return false
			// }
			// if(obj.msg=='no login'){
			// 	window.location.href="www.gx11.cn?nologin=1"
			// 	return false
			// }
		});
	},

	get: function(api, data, success) {
		// console.log(data)
// 		JSON.stringify(data)
		// data = JSON.parse(data)
		var url = ajaxUrl + api;
		if (isDebug) {
			console.log('[URL]' + url);
			console.log('[PARM]' + JSON.stringify(data));
		}
		$.get(url, data, function(obj) {
			if (isDebug) console.log('[Res]' + JSON.stringify(obj));
			success(obj);
			// console.log(obj)
			// if(obj.msg=='cookei overtime!'){
			// 	window.location.href='http://www.yixuetang11.com/shop/auth/wechatpubliclogin'
			// 	return false
			// }
			// if(obj.msg=='no login'){
			// 	window.location.href="www.gx11.cn?nologin=1"
			// 	return false
			// }
			
		}, 'json');
	}

}

var token = getUrlParam('token');
if(token){
	localStorage.setItem('token',token);
}

//中文编码 
function encode(dat) {
	
	return encodeURI(encodeURI(dat)); 
}

//中文解码
function decode(dat) {
	
	return decodeURI(decodeURI(dat)); 
}

/////////////获取链接上面的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null) return unescape(r[2]);
	return null; //返回参数值
}

//loading层
function loading(){
	//loading层
	var loading = layer.load(1, {
	  shade: [0.1,'#fff'], //0.1透明度的白色背景
	  success:function(){
		  $('.main').css('display','none')
	  }
	});
	
	$(document).ajaxStop(function(){
		layer.close(loading)
		$('.main').css('display','block')
	});
}


user_token = localStorage.getItem('token');

//获取用户信息
function yonghu() {
	var a
	$.ajax({
		type: 'GET',
		url: ajaxUrl + '/api/member/getinfo',
		data: 'user_token=' + user_token,
		async: false,
		success: function (res) {
			a =  res.data.userInfo;
		}
	});
	return a
}
//时间戳转换
function getMyDate(str) {
	var oDate = new Date(str * 1000),
		oYear = oDate.getFullYear(),
		oMonth = oDate.getMonth() + 1,
		oDay = oDate.getDate(),
		oHour = oDate.getHours(),
		oMin = oDate.getMinutes(),
		oSen = oDate.getSeconds(),
		oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(
			oSen); //最后拼接时间  
	return oTime;
}
//补0操作
function getzf(num) {
	if (parseInt(num) < 10) {
		num = '0' + num;
	}
	return num;
}