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
	getShopping:function(success,error){
		_util.request({
			url:'shopping/list',
			success:success,
			error:error
		})		
	},
	deleteAddress:function(data,success,error){
		_util.request({
			type:'put',
			url:'shopping/delete',
			data:data,
			success:success,
			error:error
		})		
	},					
}

module.exports = _shopping