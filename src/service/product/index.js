var _util = require('util')
var _product={
	getProductList:function(data,success,error){
		_util.request({
			type:'GET',
			url:'product/home/list',
			data:data,
			success:success,
			error:error
		})		
	}
}

module.exports = _product