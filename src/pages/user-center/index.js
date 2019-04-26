require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
require('pages/common/footer')
require('./index.css')

var silence = {
	init:function(){
		this.onload()
	},
	onload:function(){
		_side.render('user-center')
	}
}

$(function(){
	silence.init()
})
