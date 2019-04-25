require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')
$(function(){
	var type = _util.getParamsFromUrl('type') || 'default'
	$('.'+type).show()
})
