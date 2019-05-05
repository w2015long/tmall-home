require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
$(function(){
	var type = _util.getParamsFromUrl('type')
	
	if(type == 'payment'){
		var orderNo = _util.getParamsFromUrl('orderNo');
		var $elem = $('.get-orderNo');
		var href = $elem.attr('href') + orderNo;
		console.log(href)
		$elem.attr('href',href)
	}
	$('.'+type).show();
})
