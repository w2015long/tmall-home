require('./index.css')
var _user = require('service/user')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUsername();
		return this
	},
	bindEvent:function(){
		//绑定退出事件
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload()
			},function(msg){
				_util.showErrorMsg(msg)
			})
		})
	},
	loadUsername:function(){
		_user.getUsername(function(user){
			// console.log(userInfo)
			$('.not-login').hide();
			$('.login').show()
			.find('.username')
			.text(user.username)

		})
	}
}
module.exports = nav.init()