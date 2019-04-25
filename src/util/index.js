var _util = {

	request:function(options){
		var _this = this
		$.ajax({
			type:options.type || 'GET',
			url:options.url || '',
			dataType:options.dataType || 'json',
			data:options.data || '',
			success:function(result){
				if(result.code == 0){//成功
					options.success && options.success(result.data)
				}
				else if(result.code == 1){//失败
					options.error && options.error(result.message)
				}
				else if(result.code == 10){//无权限
					//跳转登陆页面
					_this.goLogin()
				}				
			},
			error:function(err){
				options.error && options.error(err.statusText)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	goLogin:function(){
		window.location.href = './user-login.html'
	},
	goHome:function(){
		window.location.href = '/'
	},
	getParamsFromUrl:function(key){
		//?type=register
		//?name=tom&&type=register
		//?name=tom&&type=register&&id=123		
		var query = window.location.search.substr(1)
		//'(^|&)'什么都没或者&开头
		//=[^&]* 等号后不能有&
		var reg = new RegExp('(^|&)'+type+'=([^&]*)(&|$)');
		var result = query.match(reg)
		return result ? result[2] : null
	},
	validate:function(value,type){
		var value = $.trim(value)
		//非空验证
		if(type == 'require'){
			return !!value
		}
		//用户名格式验证
		if(type == 'username'){
			var reg = /^[a-zA-Z][a-zA-Z0-9]{3,15}$/;
			return reg.test(value);
		}
		
		//密码格式验证
		if(type == 'password'){
			var reg=/^[a-zA-Z0-9]{4,10}$/;
			return reg.test(value); 
		}	
		//手机号格式验证
		if(type == 'phone'){
			var regMobile=/^1\d{10}$/;
			return regMobile.test(value); 
		}
		//邮箱格式验证
		if(type == 'email'){
			var reg=/^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/; 
			return reg.test(value); 
		}
	}	


}

module.exports = _util;