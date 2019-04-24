var _util = require('util')
var _user={
	logout:function(success,error){
			_util.request({
				type:'GET',
				url:'user/logout',
				success:success,
				error:error
			})		
	}
}

module.exports = _user