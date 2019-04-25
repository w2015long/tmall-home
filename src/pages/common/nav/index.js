require('./index.css')
var _user = require('service/user')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUserInfo();
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
	loadUserInfo:function(){
		_user.getUserInfo(function(userInfo){
			// console.log(userInfo)
			$('.not-login').hide();
			$('.login').show()
			.find('.username')
			.text(userInfo.username)

		},function(){

		})
	}
}
module.exports = nav.init()