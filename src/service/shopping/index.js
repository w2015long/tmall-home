var _util = require('util')
var _shopping={
	addShopping:function(data,success,error){
		_util.request({
			type:'post',
			url:'shopping/',
			data:data,
			success:success,
			error:error
		})		
	},
				
}

module.exports = _shopping