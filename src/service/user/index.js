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
	}
}

module.exports = _user