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
	}	

}

module.exports = _util