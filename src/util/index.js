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
	goHome(){
		window.location.href = '/'
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
	}	

}

module.exports = _util