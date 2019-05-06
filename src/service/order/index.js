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
	getOrderList:function(data,succ,err){
		_util.request({
			url:'order/home/list',
			data:data,
			success:succ,
			error:err
		})	
	},
	getOrder:function(data,succ,err){
		_util.request({
			url:'order/home/detail',
			data:data,
			success:succ,
			error:err
		})	
	},
	cancelOrder:function(data,succ,err){
		_util.request({
			type:'put',
			url:'order/cancel',
			data:data,
			success:succ,
			error:err
		})	
	},			
}

module.exports = _order