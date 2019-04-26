require('pages/common/nav')
require('pages/common/search')
var _side = require('pages/common/side')
var _user = require('service/user')
var _util = require('util')
require('pages/common/footer')
require('./index.css')

var tpl = require('./index.tpl')

var silence = {
	init:function(){
		this.onload()
		this.loadUserInfo()
	},
	onload:function(){
		_side.render('user-center')
	},
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			var html = _util.templateRender(tpl,userInfo)
			$('.side-content').html(html)
		})
	}
}

$(function(){
	silence.init()
})
