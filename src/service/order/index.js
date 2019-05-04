var _util = require('util')
var _order={
	getOrderProductList:function(success,error){
		_util.request({
			url:'order/orderProductList',
			success:success,
			error:error
		})		
	},
	createOrder:function(data,succ,err){
		_util.request({
			type:'post',
			url:'order/',
			data:data,
			success:succ,
			error:err
		})	
	},
				
}

module.exports = _order