var _util = require('util')
var _payment={

	getPaymentInfo:function(data,succ,err){
		_util.request({
			url:'payment/info',
			data:data,
			success:succ,
			error:err
		})	
	},
				
}

module.exports = _payment