var _util = require('util')
var _user={
	logout:function(success,error){
			_util.request({
				type:'GET',
				url:'user/logout',
				success:success,
				error:error
			})		
	},
	login:function(data,succ,err){
		_util.request({
			type:'post',
			url:'user/login',
			data:data,
			success:succ,
			error:err
		})
	},
	register:function(data,succ,err){
		_util.request({
			type:'post',
			url:'user/register',
			data:data,
			success:succ,
			error:err
		})
	},	
	getUserInfo:function(succ,err){
		_util.request({
			url:'user/userInfo',
			success:succ,
			error:err
		})			
	},
	checkUserName:function(username,succ,err){
		_util.request({
			url:'user/checkUsername',
			data:{
				username:username
			},
			success:succ,
			error:err			
		})
	}
}

module.exports = _user