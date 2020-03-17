$(function(){
	isIPhoneX()
	function isIPhoneX(fn){
		var u = navigator.userAgent;
		var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if (isIOS) {    	
			if (screen.height == 812 && screen.width == 375){
				//是iphoneX
				console.log(55555566)
				$('.header').addClass('selected');
				$('.group').addClass('on')
			}else if (screen.height == 896 && screen.width == 414){
				//不是iphoneX
				$('.header').addClass('selected');
				$('.group').addClass('on')
			}else{
				
			}
		}
	}
})